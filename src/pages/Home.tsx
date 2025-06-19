import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { getUserRepos, searchUsers } from "../services/githubApi";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const {
    data: users,
    isFetching,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["users", query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
  });

  const handleSearch = () => {
    setQuery(input);
  };

  return (
    <section className="flex flex-col items-center gap-6 p-4">
      <h1 className="text-xl font-bold text-center">GitHub Explorer</h1>

      <SearchBar
        input={input}
        onInputChange={setInput}
        onSearch={handleSearch}
        loading={isFetching}
      />

      {query && isFetched && users && users.length > 0 && (
        <div className="w-full max-w-md text-left">
          <p className="text-sm text-gray-700">
            Showing users for <span className="font-bold">"{query}"</span>
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      {isFetched && users && users.length > 0 && (
        <div className="flex flex-col w-full max-w-md gap-3">
          {users.map((user) => (
            <UserCard
              key={user.login}
              user={user}
              onFetchUserRepos={getUserRepos}
            />
          ))}
        </div>
      )}

      {isFetched && users?.length === 0 && !isFetching && !error && (
        <p className="text-sm text-gray-500">No users found</p>
      )}
    </section>
  );
};

export default Home;
