import React, { FC, useState, useEffect } from "react";
import "../assets/stylesheets/updatedHome.css";
import LogoN from "../assets/images/LogoN.png";
import text from "../assets/images/text.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import RecipeModal from "./RecipeModal";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setMovie, setResponse } from "../state/responseSlice";
import { openResponseDialog } from "../state/dialogSlice";
import { RootState } from "../state/store";
import { toast } from "sonner";
import SuggestionsCarousel from "./Crousel";
import { LuSendHorizonal } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import { MovieData } from "@/lib/types";

const typingTexts = [
  "Let's cook!",
  "What are you thinking of?",
  "Give ingredients, receive recipes!",
  "What's on your mind?",
];

const Home: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [placeholderText, setPlaceholderText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<
    "typing" | "pause" | "deleting" | "waiting"
  >("typing");
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const responseDialog = useSelector(
    (state: RootState) => state.dialog.responseDialog
  );
  useEffect(() => {
    async function getName() {
      const res = await fetch("/api/user/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.name) {
        setName(data.name);
        for (let i = 0; i < typingTexts.length; i++) {
          typingTexts[i] = `Hey ${data.name}, ${typingTexts[i]}`;
        }
      }
    }
    async function isValid() {
      fetch("/api/auth/check-session", {
        method: "GET",
        credentials: "include", // Ensures the session cookie is sent with the request
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 1) {
            console.log("User is authenticated");
            setIsLoggedIn(true);
            getName();
          } else {
            console.log("User is not authenticated");
          }
        })
        .catch((error) => console.error("Error:", error));
    }

    isValid();
  }, []);

  useEffect(() => {
    if (inputValue !== "") {
      return;
    }

    let timer: number;

    switch (animationPhase) {
      case "typing":
        if (placeholderText !== typingTexts[textIndex]) {
          timer = window.setTimeout(() => {
            setPlaceholderText(
              typingTexts[textIndex].slice(0, placeholderText.length + 1)
            );
          }, 100);
        } else {
          setAnimationPhase("pause");
        }
        break;

      case "pause":
        timer = window.setTimeout(() => {
          setAnimationPhase("deleting");
        }, 2500);
        break;

      case "deleting":
        if (placeholderText !== "") {
          timer = window.setTimeout(() => {
            setPlaceholderText(placeholderText.slice(0, -1));
          }, 50);
        } else {
          setAnimationPhase("waiting");
        }
        break;

      case "waiting":
        timer = window.setTimeout(() => {
          setTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
          setAnimationPhase("typing");
        }, 500);
        break;
    }

    return () => window.clearTimeout(timer);
  }, [placeholderText, animationPhase, textIndex, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    if (inputValue === "") {
      setPlaceholderText("");
    }
    if (!isLoggedIn) {
      setShowModal(true);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setAnimationPhase("typing");
    }
  };

  const openRegisterModal = () => {
    setShowModal(false);
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowModal(true);
    setShowRegisterModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowRegisterModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include", // Necessary to include session cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        // credentials: "same-origin", //only for same-origin requests
      });

      const data = await response.json();

      if (response.ok) {
        toast("Login successful");
        window.location.href = "/";
      } else {
        console.error("Login failed:", data.message);
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include", // Include credentials to save cookies, only in cross-origin requests
        // credentials: "same-origin", //only for same-origin requests
      });

      const data = await response.json();

      if (response.ok) {
        toast("Register successful");
        closeRegisterModal();
      } else {
        console.error("Register failed:", data.message);
        alert(`Register failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  const fetchMovieData = async () => {
    try {
      const response = await fetch("/api/movie/ask", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials to save cookies, only in cross-origin requests
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: MovieData = await response.json();
      if (!data.image) {
        fetchMovieData();
      }
      dispatch(setMovie(data));
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleSearchClick = async () => {
    setLoading(true); // Set loading to true when search starts
    try {
      // Fetch recipe data
      const recipeResponse = await fetch("/api/gpt/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputValue }),
        credentials: "include", // Include credentials to save cookies, only in cross-origin requests
      });

      if (!recipeResponse.ok) {
        const errorData = await recipeResponse.json();
        console.error("Recipe fetch failed:", errorData.message);
        setLoading(false); // Stop loading if the request fails
        return;
      }

      const recipeData = await recipeResponse.json();
      dispatch(setResponse(recipeData));
      dispatch(openResponseDialog());
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  const handleSuggestionClick = async (title: string) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    setLoading(true); // Set loading to true when search starts
    fetchMovieData();
    try {
      const response = await fetch("/api/gpt/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: title }),
        credentials: "include", // Include credentials to save cookies, only in cross-origin requests
      });

      if (response.ok) {
        dispatch(setResponse(await response.json()));
        dispatch(openResponseDialog());
        setLoading(false); // Stop loading when data is received
      } else {
        const data = await response.json();
        console.error(" failed:", data.message);
        setLoading(false); // Stop loading if the request fails
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="home_container relative w-full h-screen bg-no-repeat bg-center bg-cover flex flex-col justify-evenly md:justify-between before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-t before:from-[rgba(150,96,55,0.8)] before:to-[rgba(150,96,55,0)] before:z-0">
      {/* <img src={Logo} alt="Logo" className="homeLogo" /> */}
      <div className="w-full h-20 flex flex-col justify-center items-center relative">
        <img
          src={LogoN}
          alt="Logo"
          className="homeLogoN animate-spinCustom w-32 md:w-52 absolute top-1/2"
        />
        <img
          src={text}
          alt="Logo"
          className="homeLogoT w-28 md:w-52 absolute top-[70%] drop-shadow-custom"
        />
      </div>
      <div className="flex place-items-center justify-center gap-2 mt-28 z-50">
        <Textarea
          className="searchBox custom-placeholder w-60 md:w-1/3 py-2 px-4 xl:py-4 xl:px-6 rounded-2xl bg-transparent border-white text-white placeholder:text-gray-300 border-0 bg-gradient-to-b from-[rgba(200,119,53,0.6)] to-[rgba(194,180,134,0.0)] font-sans tracking-wide shadow-[0_-10px_10px_rgba(0,0,0,0.15)] backdrop-blur-sm max-h-[40px]"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={inputValue === "" ? placeholderText : ""}
        />

        {inputValue && (
          <div
            onClick={() => {
              handleSearchClick();
              fetchMovieData();
            }}
            className="transition-all hover:translate-x-4 duration-500 hover:cursor-pointer"
          >
            <LuSendHorizonal className="search-icon text-main w-fit h-10 my-auto" />
          </div>
        )}
      </div>
      {showModal && (
        <LoginModal
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          openRegisterModal={openRegisterModal}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          onClose={handleModalClose}
          onSubmit={handleRegisterSubmit}
          openLoginModal={() => {
            setShowRegisterModal(false);
            setShowModal(true);
          }}
        />
      )}
      {/* Loading Spinner */}
      {loading && <Spinner />} {/* Show loading spinner while fetching data */}
      {responseDialog && <RecipeModal />}
      <SuggestionsCarousel handleSuggestionClick={handleSuggestionClick} />
    </div>
  );
};

export default Home;
