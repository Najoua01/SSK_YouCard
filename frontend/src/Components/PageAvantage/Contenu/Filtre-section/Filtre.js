import React, { useState } from 'react';
import './Filtre.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Filtre = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className='filtre-section'>
      <div className='searchbox-f'>
        <input 
          type='text' 
          placeholder='Recherche' 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className='dropdown-f'>
        <select value={selectedSortOption} onChange={handleSortChange}> 
          <option value="recommendations">Recommendations</option>
          <option value="newest">Nouveauté</option>
          <option value="a-z">A-Z</option>
        </select>
      </div>

      <div className='dropdown-f'>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Sélectionnez un pays</option>
          <option value="belgium">Belgique</option>
          <option value="netherlands">Pays-Bas</option>
          <option value="luxembourg">Luxembourg</option>
          <option value="france">France</option>
        </select>
      </div>

      <div className='codepost'>
        <input 
          type='text' 
          placeholder='Code postal' 
          value={postalCode} 
          onChange={handlePostalCodeChange}
        />
      </div>
    </div>

  );
};

export default Filtre;
