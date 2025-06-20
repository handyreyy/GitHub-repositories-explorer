import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import type { GitHubRepo } from "../types/Repo";
import type { GitHubUser } from "../types/User";
import RepoList from "./RepoList";

type Props = {
  user: GitHubUser;
  onFetchUserRepos: (username: string, page: number) => Promise<GitHubRepo[]>;
};

const UserCard: React.FC<Props> = ({ user, onFetchUserRepos }) => {
  const [open, setOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["repos", user.login],
    queryFn: ({ pageParam = 1 }) => onFetchUserRepos(user.login, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 5 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: open,
  });

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const repos = data?.pages.flat() ?? [];

  return (
    <div className="border rounded-lg">
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full gap-3 p-3 transition bg-white rounded-t-lg hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-medium text-gray-800">
            {user.login}
          </span>
        </div>
        <span className="text-xs text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="p-4 text-sm border-t bg-gray-50 max-h-[300px] overflow-y-auto">
          {isFetching && !isFetchingNextPage && (
            <div className="w-full text-center">
              <p className="text-blue-500">Loading repositories...</p>
            </div>
          )}

          {error && (
            <div className="w-full text-center">
              <p className="text-red-500">Failed to load repositories.</p>
            </div>
          )}

          {!isFetching && !error && repos.length === 0 && (
            <div className="w-full text-center">
              <p className="text-sm text-gray-500">No repositories found.</p>
            </div>
          )}

          <RepoList repos={repos} />

          {hasNextPage && (
            <div className="w-full mt-3 text-center">
              <button
                onClick={() => fetchNextPage()}
                className="text-sm text-blue-500 hover:underline"
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
