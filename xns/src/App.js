import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './xrpl.png';

const getAnimatedPlaceholder = (placeholderTexts, typingIndex, name) => {
  const totalPhrases = placeholderTexts.length;
  const currentIndex = Math.floor(typingIndex / totalPhrases) % (totalPhrases * 2);
  const currentPhraseIndex = currentIndex % totalPhrases;
  const currentPhrase = placeholderTexts[currentPhraseIndex];
  const currentText = currentPhrase.substring(0, typingIndex % currentPhrase.length);

  return `${currentText}${name !== '' ? name.substring(typingIndex) : ''}`;
};





const App = () => {
  const [name, setName] = useState('');
  const [resolvedName, setResolvedName] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const placeholderTexts = [
    "Seize the Opportunity: Claim Your .xrpl Domain now!    ",

    
  ];
  const placeholderDelay = 100; // Delay between each character being shown in milliseconds

  useEffect(() => {
    if (name === '') {
      setTypingIndex(0);
    }
  }, [name]);

  useEffect(() => {
    let timeoutId = null;

    if (name === '') {
      timeoutId = setTimeout(() => {
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, placeholderDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name, typingIndex]);

  const resolveName = async () => {
    // Implement the logic to resolve the name here
    // Update the 'resolvedName' state with the resolved name
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </header>
      <main>
        <div className="search-container">
          <h1 className="title">XRPL Naming Service</h1>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder={getAnimatedPlaceholder(placeholderTexts, typingIndex, name)}
              value={name}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={resolveName}>
              Search
            </button>
          </div>
          <div className="resolved-name">
            {resolvedName && <p>Resolved Name: {resolvedName}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;