import React, { useState } from 'react';
import axios from 'axios';

const DomainSearch = () => {
  const [filteredDomains, setFilteredDomains] = useState([]);
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
          query: searchTerm,
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

      const response = await axios(options);

      const { result } = response.data;
      const availableDomains = Object.entries(result)
        .filter(([_, domainInfo]) => domainInfo.status === 'available')
        .map(([domain, domainInfo]) => domain);

      if (availableDomains.length > 0) {
        setFilteredDomains(availableDomains);
        setErrorMessage('');
      } else {
        setFilteredDomains([]);
        setErrorMessage('No available domains found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFilteredDomains([]);
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
        filteredDomains.length > 0 && (
          <div className="tld-results">
            <h2>Available Domain Names</h2>
            <ul>
              {filteredDomains.map((domain) => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default DomainSearch;
