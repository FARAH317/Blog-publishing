import { useState } from 'react';
const SearchBar=({ onSearch })=> {
  const [term, setTerm]=useState('');
  const handleSubmit=(event)=> {
    event.preventDefault();
    onSearch(term.trim());
  };
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={term}
        onChange={(event)=> setTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchBar;
