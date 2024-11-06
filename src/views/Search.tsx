/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../components/searchComponents/SearchInput';
import SearchResults from '../components/searchComponents/SearchResults';
import Layout from '@/components/Layout';
import { fetchSearchUser } from '@/redux/slices/authSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { users, loading, error } = useSelector((state) => state.auth); 

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) return; // Exit early if no search term
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(fetchSearchUser({ searchTerm, token: storedToken }));
    }
  };

  return (
    <Layout>
      <div className="max-w-[900px] flex shadow-lg bg-white min-h-[100vh]">
        <div className="w-full flex items-center flex-col mx-auto px-4 py-4">
          <SearchInput query={query} setQuery={setQuery} onSearch={handleSearch} />
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {users && users.length > 0 && <SearchResults results={users} />}
          {users && users.length === 0 && <div>No results found</div>}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
