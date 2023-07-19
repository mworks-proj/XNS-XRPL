import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './xrpl.png';

import TypewriterSearchBar from './components/searchbar/typewriterSearchBar';

const App = () => {
  const [name, setName] = useState('');
  const [resolvedName] = useState('');
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
           <TypewriterSearchBar />
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
