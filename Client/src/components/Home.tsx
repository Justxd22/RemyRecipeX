import React, { FC, useState, useEffect } from 'react';
import { FaUser, FaLock, FaTimes } from "react-icons/fa";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5"; // New import for modern icons
import { TbArrowBadgeRightFilled, TbArrowBadgeLeftFilled } from "react-icons/tb";
import '../assets/stylesheets/Home.css';
import LogoN from '../assets/images/LogoN.png';
import text from '../assets/images/text.png';
import suggestion1 from '../assets/images/suggestion1.png';
import suggestion2 from '../assets/images/suggestion2.png';
import suggestion3 from '../assets/images/suggestion3.png';
import suggestion4 from '../assets/images/suggestion4.png';
import suggestion5 from '../assets/images/suggestion5.png';
import suggestion6 from '../assets/images/suggestion6.png';
import suggestion7 from '../assets/images/suggestion7.png';
import suggestion8 from '../assets/images/suggestion8.png';

let typingTexts = [
  "Let's cook!",
  "What are you thinking of?",
  "Give ingredients, receive recipes!",
  "What's on your mind?"
];

const suggestions = [
  { title: "Chicken Maratha", image: suggestion1 },
  { title: "Sweet & Sour", image: suggestion2 },
  { title: "Bacon", image: suggestion3 },
  { title: "Rice", image: suggestion4 },
  { title: "Pasta", image: suggestion5 }, // Add more suggestions as needed
  { title: "Salad", image: suggestion6 },
  { title: "Burger", image: suggestion7 },
  { title: "Pizza", image: suggestion8 },
];

const Home: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'typing' | 'pause' | 'deleting' | 'waiting'>('typing');
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    async function getName() {
      const res = await fetch('/api/user/profile', { credentials: 'same-origin' });
      const data = await res.json();
      console.log(data);
      if (data.name) {
        setName(data.name);
        for (let i = 0; i < typingTexts.length; i++) {
          typingTexts[i] = `Hey ${data.name}, ${typingTexts[i]}`;
        }
      }
    }
    async function isValid() {
        const res = await fetch('/api/auth/check-session', { credentials: 'same-origin' });
        const data = await res.json();
        console.log(data);
        if (data.code === 1) {
          setIsLoggedIn(true);
          getName();
        }
    }
    isValid();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (inputValue !== '') {
      return;
    }

    let timer: number;

    switch (animationPhase) {
      case 'typing':
        if (placeholderText !== typingTexts[textIndex]) {
          timer = window.setTimeout(() => {
            setPlaceholderText(typingTexts[textIndex].slice(0, placeholderText.length + 1));
          }, 100);
        } else {
          setAnimationPhase('pause');
        }
        break;

      case 'pause':
        timer = window.setTimeout(() => {
          setAnimationPhase('deleting');
        }, 2500);
        break;

      case 'deleting':
        if (placeholderText !== '') {
          timer = window.setTimeout(() => {
            setPlaceholderText(placeholderText.slice(0, -1));
          }, 50);
        } else {
          setAnimationPhase('waiting');
        }
        break;

      case 'waiting':
        timer = window.setTimeout(() => {
          setTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
          setAnimationPhase('typing');
        }, 500);
        break;
    }

    return () => window.clearTimeout(timer);
  }, [placeholderText, animationPhase, textIndex, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
  };

  const getVisibleSuggestions = () => {
    const visibleSuggestions = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % suggestions.length;
      visibleSuggestions.push(suggestions[index]);
    }
    return visibleSuggestions;
  };

  const handleInputFocus = () => {
    if (inputValue === '') {
      setPlaceholderText('');
    }
    if (!isLoggedIn) {
      setShowModal(true);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === '') {
      setAnimationPhase('typing');
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
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            // credentials: 'include', // Include credentials to save cookies, only in cross-origin requests
            credentials: 'same-origin', //only for same-origin requests
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            window.location.href = '/';
        } else {
            console.error('Login failed:', data.message);
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
    }
};

const handleRegisterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
      const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
          // credentials: 'include', // Include credentials to save cookies, only in cross-origin requests
          credentials: 'same-origin', //only for same-origin requests
      });

      const data = await response.json();

      if (response.ok) {
          console.log('Register successful:', data);
          closeRegisterModal();
      } else {
          console.error('Register failed:', data.message);
          alert(`Register failed: ${data.message}`);
      }
  } catch (error) {
      console.error('Error occurred during login:', error);
  }
};

  return (
    <div className="homeContainer">
      {/* <img src={Logo} alt="Logo" className="homeLogo" /> */}
      <img src={LogoN} alt="Logo" className="homeLogoN" />
      <img src={text} alt="Logo" className="homeLogoT" />
      <input
        type="text"
        className="searchBox custom-placeholder"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={inputValue === '' ? placeholderText : ''}
      />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <button type="button" className="close-modal" onClick={handleModalClose}><FaTimes className="icon" /></button>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <FaLock className="icon" />
            </div>
            <button className="loginB" type="submit">Login</button>
            <div className="register-link">
              <p>Don't have an account? <button type="button" className="regbutton " onClick={openRegisterModal}>Register</button></p>
            </div>
          </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleRegisterSubmit}>
              <button type="button" className="close-modal" onClick={handleModalClose}>X</button>
              <h1>Register</h1>
              <div className="input-box">
                <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaLock className="icon" />
              </div>
              <button className="loginB" type="submit">Register</button>
              <div className="register-link">
                <p>Already have an account? <button type="button" className="regbutton" onClick={closeRegisterModal}>Login</button></p>
              </div>
            </form>
          </div>
        </div>



      )}
      <div className="suggestionsContainer">
        {getVisibleSuggestions().map((suggestion, index) => (
          <div key={index} className="suggestion">
            <h3>{suggestion.title}</h3>
            <img src={suggestion.image} alt={suggestion.title} />
          </div>
        ))}
      </div>
      <button className="sliderButton left" onClick={prevSlide}>
        <TbArrowBadgeLeftFilled />
      </button>
      <button className="sliderButton right" onClick={nextSlide}>
        <TbArrowBadgeRightFilled />
      </button>
    </div>
  );
};

export default Home;
