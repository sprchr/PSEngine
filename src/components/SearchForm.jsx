import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
const SearchForm = ({index}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }
    setLoading(true);
    setResult(null)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search/${index}`, { query });
      setResult(response.data.answer);
    } catch (error) {
      setResult("Error fetching result.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4  border-2 h-full w-full bg-white shadow-2xl rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Search </h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your search query"
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {result && (
        <div className="mt-4 h-full">
          <h3 className="font-semibold">Result:</h3>
          <ReactMarkdown>{result}</ReactMarkdown>
          
        </div>
      )}
    </div>
  );
};

export default SearchForm;
