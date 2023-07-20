import React, { useState, useEffect, useMemo, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TypewriterSearchBar = ({ onSearch }) => {
  const searchStrings = useMemo(
    () => [
      "Claim Your .xrpl Domain now!",
      "Join the XRPL Revolution!",
      "Innovate with Confidence!"
    ],
    []
  );

  const animationCycles = 2.2;
  const currentIndexRef = useRef(0);
  const animationCycleCountRef = useRef(0);
  const [currentString, setCurrentString] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Flag to track user typing

  useEffect(() => {
    const currentIndex = currentIndexRef.current;
    const currentStringLength = searchStrings[currentIndex].length;

    if (animationCycleCountRef.current < animationCycles) {
      if (!isTyping) {
        const animationTimeout = setTimeout(() => {
          if (currentString.length === currentStringLength) {
            const nextIndex = (currentIndex + 1) % searchStrings.length;
            currentIndexRef.current = nextIndex;
            setCurrentString('');
            animationCycleCountRef.current++;
          } else {
            setCurrentString((prevString) => prevString + searchStrings[currentIndex][currentString.length]);
          }
        }, 115);

        return () => clearTimeout(animationTimeout);
      }
    }
  }, [currentString, searchStrings, isTyping]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
    setIsTyping(true);
  };

  const handleSearch = () => {
    setIsTyping(false); // User has finished typing
    // Trigger the search by calling the onSearch function from the parent component (App)
    onSearch(userInput);
  };

  const placeholderText = searchStrings[currentIndexRef.current].slice(currentString.length);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={userInput + currentString}
        onChange={handleChange}
        className="form-control"
        placeholder={placeholderText}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default TypewriterSearchBar;
