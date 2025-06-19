import React, { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  loading: boolean;
};

const SearchBar: React.FC<Props> = ({ onSearch, loading }) => {
  const [input, setInput] = useState("");

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />

      {loading && (
        <p className="mt-2 text-center text-blue-500 text-sm">Loading...</p>
      )}
    </div>
  );
};

export default SearchBar;
