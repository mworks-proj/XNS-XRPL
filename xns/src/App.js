import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './xrpl.png';
//import TypewriterSearchBar from './components/searchbar/typewriterSearchBar'; // Importing Custom Placeholder animation
import DomainSearch from './components/api/DomainSearch'; // Importing Domain Search API 

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <nav className="menu">
          <ul>
            <li><a href="/">Register</a></li>
            <li><a href="/">Governance</a></li>
            <li><a href="/">About</a></li>
            {/* Add other navigation links here */}
          </ul>
        </nav>
      </header>
      <main>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="search-container">
          <h1 className="title">XRPL Naming Service</h1>
          <DomainSearch filteredTLDs={DomainSearch.filteredTLDs} />
        </div>
        
      </main>
    </div>
  );
};

export default App;
