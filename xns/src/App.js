import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './xrpl.png';

const App = () => {
  const [name, setName] = useState('');
  const [resolvedName] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  
  const placeholderTexts = [
    "Get your .xrpl now before it's too late.",
    "XRPL Awaits You: Claim Your .xrpl Domain and Be at the Forefront of Innovation!"
  ];
  
  const placeholderDelay = 100; // Delay between each character being shown in milliseconds

  useEffect(() => {
    let timeoutId = null;

    if (name === '') {
      timeoutId = setTimeout(() => {
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, placeholderDelay);
    } else {
      setTypingIndex(0);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name, placeholderDelay]);

  const [registeredTLDs, setRegisteredTLDs] = useState([]);
  const [filteredTLDs, setFilteredTLDs] = useState([]);

  const handleSearch = () => {
    // Simulated logic to fetch registered TLDs based on user input
    // Replace with your own logic to retrieve TLDs from the backend or external source
    const simulatedRegisteredTLDs = [
      'logistics.xrpl',
      'test.xrpl',
      'WoJ4ke.xrpl',
      'EverNode.xrpl',
      'Gem.xrpl'
    ];

    setRegisteredTLDs(simulatedRegisteredTLDs);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

    // Filter registered TLDs based on user input
    const filteredTLDs = registeredTLDs.filter((tld) => tld.includes(inputValue));
    setFilteredTLDs(filteredTLDs);
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="menu">
          <ul>
            <li><a href="app.js">Registry</a></li>
            <li><a href="app.js">Governance</a></li>
            <li><a href="app.js">About</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="search-container">
          <h1 className="title">XRPL Naming Service</h1>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder={placeholderTexts[0]}
              value={name}
              onChange={handleInputChange}
            />
            <div className="search-button-container">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="resolved-name">
            {resolvedName && <p>Resolved Name: {resolvedName}</p>}
          </div>
        </div>

        {filteredTLDs.length > 0 && (
          <div className="tld-results">
            <h2>Registered TLDs</h2>
            <ul>
              {filteredTLDs.map((tld) => (
                <li key={tld}>{tld}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
