import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { getUserRepos, searchUsers } from "../services/githubApi";
import { useDebounce } from "../utils/useDebounce";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: users,
    isFetching,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["users", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  const handleSearch = (input: string) => {
    setQuery(input);
  };

  return (
    <section className="p-4 flex flex-col items-center gap-6">
      <h1 className="text-xl font-bold text-center">GitHub Explorer</h1>

      <SearchBar onSearch={handleSearch} loading={isFetching} />

      {error && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again.
        </p>
      )}

      {isFetched && users && users.length > 0 && (
        <div className="w-full max-w-md flex flex-col gap-3">
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
        <p className="text-gray-500 text-sm">No users found</p>
      )}
    </section>
  );
};

export default Home;
