import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './xrpl.png';
import DomainSearch from './components/api/DomainSearch';
import About from './pages/about';
import Governance from './pages/gov';

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <nav className="menu">
            <ul>
              {/* Use Link components for navigation */}
              <li><Link to="/gov">Governance</Link></li>
              <li><Link to="/about">About</Link></li>
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

          {/* Use the Routes component to handle routing */}
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/gov" element={<Governance />} />
            <Route path="/about" element={<About />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
