type Props = {
  input: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
};

const SearchBar: React.FC<Props> = ({
  input,
  onInputChange,
  onSearch,
  loading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search GitHub users..."
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="w-full py-2 mt-3 text-white transition bg-blue-500 rounded hover:bg-blue-600"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
