import React, { FC, useState, useEffect } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import '../assets/stylesheets/Home.css';
// import Logo from '../assets/images/Logo.png';
import LogoN from '../assets/images/LogoN.png';
import text from '../assets/images/text.png';
import suggestion1 from '../assets/images/suggestion1.png';
import suggestion2 from '../assets/images/suggestion2.png';
import suggestion3 from '../assets/images/suggestion3.png';
import suggestion4 from '../assets/images/suggestion4.png';

const typingTexts = [
  "Let's cook!",
  "What are you thinking of?",
  "Give ingredients, receive recipes!",
  "What's on your mind?"
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
    async function isValid() {
        const res = await fetch('/api/auth/check-session', { credentials: 'same-origin' });
        const data = await res.json();
        console.log(data);
        if (data.code === 1) {
          setIsLoggedIn(true);
          // setShowModal(false);
        }
    }
    isValid();
  }, []);

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
            <button type="button" className="close-modal" onClick={handleModalClose}>X</button>
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
        <div className="suggestion">
          <h3>Ratatouille</h3>
          <img src={suggestion1} alt="Food 1" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button>Try Recipe!</button>
        </div>
        <div className="suggestion">
          <h3>Tikka Masala</h3>
          <img src={suggestion2} alt="Food 2" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button>Try Recipe!</button>
        </div>
        <div className="suggestion">
          <h3>Karaikudi Curry</h3>
          <img src={suggestion3} alt="Food 3" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button>Try Recipe!</button>
        </div>
        <div className="suggestion">
          <h3>Noodles</h3>
          <img src={suggestion4} alt="Food 4" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button>Try Recipe!</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
