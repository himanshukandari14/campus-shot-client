// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import  { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ onSearch, query, setQuery }) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Delay 500ms after the user stops typing

    return () => clearTimeout(timeout); // Cleanup the timeout on effect cleanup
  }, [query]);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery !== query) {
      onSearch(debouncedQuery); // Trigger search only when the debounced query changes
    }
  }, [debouncedQuery, onSearch, query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full flex justify-center mb-8">
      <div className="relative w-[70%]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Handle Enter key press
          placeholder="Search for something..."
          className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          onClick={handleSearch} // Trigger search on icon click
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500 justify-center items-center flex"
          style={{ fontSize: '1.5rem' }} // Make the icon larger
        >
          <FaSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
