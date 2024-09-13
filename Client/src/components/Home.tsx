import React, { FC, useState, useEffect } from 'react';
import '../assets/stylesheets/Home.css';
import Logo from '../assets/images/Logo.png';
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
  };

  const handleInputBlur = () => {
    if (inputValue === '') {
      setAnimationPhase('typing');
    }
  };

  return (
    <div className="homeContainer">
      <img src={Logo} alt="Logo" className="homeLogo" />
      <input
        type="text"
        className="searchBox custom-placeholder"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={inputValue === '' ? placeholderText : ''}
      />
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
