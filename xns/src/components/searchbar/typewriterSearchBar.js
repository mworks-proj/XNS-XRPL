import React, { useEffect, useState } from 'react';

const TypewriterSearchBar = () => {
  const searchStrings = ["get started on .xrpl now", "another string", "yet another string"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentString, setCurrentString] = useState('');

  useEffect(() => {
    if (currentIndex === searchStrings.length) return; // Animation finished, stop

    const currentStringLength = searchStrings[currentIndex].length;
    const animationTimeout = setTimeout(() => {
      if (currentString.length === currentStringLength) {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next string
        setCurrentString(''); // Reset currentString for the next animation
      } else {
        setCurrentString((prevString) => prevString + searchStrings[currentIndex][currentString.length]);
      }
    }, 125);

    return () => clearTimeout(animationTimeout);
  }, [currentString, currentIndex]);

  return (
    <div className="search-bar">
      <input type="text"  value={currentString} disabled />
    </div>
    
  );
};



export default TypewriterSearchBar;