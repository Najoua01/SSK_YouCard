import React, { useState, useEffect } from 'react';
import './SearchActu.css';

function SearchActu() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  const currentYear = currentDate.getFullYear();

  // Function to format month name
  const formatMonth = (month) => {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[month - 1]; // Adjust for 0-based indexing
  };

  // Generate options with current month selected
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1) % 12 || 12; // Handle December rollover
    const formattedMonth = formatMonth(month);
    return (
      <option key={`${formattedMonth}-${currentYear}`} value={`${formattedMonth} ${currentYear}`}>
        {`${formattedMonth} ${currentYear}`}
      </option>
    );
  });

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  useEffect(() => {
    // Set the initially selected date based on current month and year
    setSelectedDate(`${formatMonth(currentMonth)} ${currentYear}`);
  }, []); // Empty dependency array to run effect only once

  return (
    <div className='sa-container'>
      <div className='filtre-actu'>
        <p>Rechercher:</p>
        <div className='searchbox-a'>
          <input type='text' placeholder='ex: musée' />
          <i className="fas fa-search"></i>
        </div>
        <p>Date:</p>
        <div className='dropdown-date'>
          <select value={selectedDate} onChange={handleDateChange}>
            <option value=''>Select Date</option>
            {months}
          </select>
        </div>
      </div>
      <div className='filtre-b'>
        <button className='btn-filtre'>Rechercher</button>
      </div>
    </div>
  );
}

export default SearchActu;
