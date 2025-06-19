import React from "react";
import type { GitHubRepo } from "../types/Repo";

type Props = {
  repos: GitHubRepo[];
};

const RepoList: React.FC<Props> = ({ repos }) => {
  return (
    <div className="flex flex-col w-full max-w-xl gap-4 mt-6">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="p-4 transition bg-white border rounded-md shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {repo.name}
            </a>
            <span className="ml-4 text-xs text-gray-500 shrink-0">
              ⭐ {repo.stargazers_count}
            </span>
          </div>

          {repo.description && (
            <p className="mt-1 text-sm text-gray-700">{repo.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RepoList;
