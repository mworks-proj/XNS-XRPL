import React from 'react';
import DomainSearch from './';

const Registry = () => {
  return (
    
    <div className="search-container">
            <h1 className="title">XRPL Naming Service</h1>
            <DomainSearch filteredTLDs={DomainSearch.filteredTLDs} />
    </div>
  );
};

export default Registry;
