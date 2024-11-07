import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (input) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
