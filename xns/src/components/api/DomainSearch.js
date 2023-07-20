import React, { useState } from 'react';
import axios from 'axios';

const DomainSearch = () => {
  const [filteredTLDs, setFilteredTLDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://domain-suggestion-engine.p.rapidapi.com/api/domain-suggest',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '631fb252b0msh8f0bbecc4c8cf7ep11c039jsn4d1489194a87',
          'X-RapidAPI-Host': 'domain-suggestion-engine.p.rapidapi.com'
        },
        data: {
          query: searchTerm, // Use the domain name entered by the user for the search
          search_type: ['available', 'registered'],
          tlds: ['com', 'net'],
          idn: true,
          page_size: 25,
          algorithm: 'full',
          score: {
            com: 1,
            net: 0.9,
            org: 0.8,
            pl: 0.7,
            bg: 0.8
          },
          language: 'en'
        }
      };

      const response = await axios.request(options);

      if (Array.isArray(response.data)) {
        // Extract the domain names from the API response data
        const domainNames = response.data.map(item => item.domain);
        setFilteredTLDs(domainNames); // Update filteredTLDs with the domain names
        setErrorMessage('');
      } else {
        setFilteredTLDs([]);
        setErrorMessage('No domain names found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFilteredTLDs([]);
      setErrorMessage('Error fetching data. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search for domain names"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        filteredTLDs.length > 0 && (
          <div className="tld-results">
            <h2>Domain Names</h2>
            <ul>
              {filteredTLDs.map((domainName) => (
                <li key={domainName}>{domainName}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default DomainSearch;
