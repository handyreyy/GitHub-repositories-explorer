import React from "react";
import type { GitHubRepo } from "../types/Repo";

type Props = {
  repos: GitHubRepo[];
};

const RepoList: React.FC<Props> = ({ repos }) => {
  return (
    <div className="w-full max-w-xl flex flex-col gap-4 mt-6">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="border p-4 rounded-md shadow hover:shadow-md transition bg-white"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold text-lg hover:underline"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="text-sm text-gray-700 mt-1">{repo.description}</p>
          )}
          <div className="text-xs text-gray-500 mt-2">
            ⭐ {repo.stargazers_count}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
