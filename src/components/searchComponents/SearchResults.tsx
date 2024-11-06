import React from "react";
import ResultCard from "./ResultCard";

const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No results found. Try another search.
      </p>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 items-center">
      {results.map((result, index) => (
        <ResultCard key={index} {...result} />
      ))}
    </div>
  );
};

export default SearchResults;
