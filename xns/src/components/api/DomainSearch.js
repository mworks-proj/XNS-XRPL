import React, { useState } from 'react';
import axios from 'axios';
import './DomainSearch.css'; // Import the CSS file for styling

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
          'X-RapidAPI-Host': 'domain-suggestion-engine.p.rapidapi.com',
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
            bg: 0.8,
          },
          language: 'en', // Set the language to 'en'
        },
      };

      const response = await axios(options);
      const data = response.data.result;

      if (data && Object.keys(data).length > 0) {
        // Extract the domain names and status from the API response data
        const domainData = Object.keys(data).map((key) => ({
          domain: key,
          status: data[key].status,
        }));
        setFilteredTLDs(domainData); // Update filteredTLDs with the domain data
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
          <div className="table-container">
            <h2>Domain Names</h2>
            <table className="domain-table">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTLDs.map((domain) => (
                  <tr key={domain.domain}>
                    <td>{domain.domain}</td>
                    <td>{domain.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default DomainSearch;
