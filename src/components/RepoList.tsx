import React, { useEffect, useRef, useState } from "react";
import type { GitHubRepo } from "../types/Repo";

type Props = {
  repos: GitHubRepo[];
};

const RepoList: React.FC<Props> = ({ repos }) => {
  return (
    <div className="flex flex-col w-full max-w-xl gap-4 mt-6">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

const RepoItem: React.FC<{ repo: GitHubRepo }> = ({ repo }) => {
  const nameRef = useRef<HTMLAnchorElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = nameRef.current;
    if (el) {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [repo.name]);

  return (
    <div className="relative p-4 transition bg-white border rounded-md shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <a
          ref={nameRef}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-600 hover:underline truncate block max-w-[75%]"
          onMouseEnter={() => isOverflow && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {repo.name}
        </a>

        {showTooltip && (
          <div className="absolute left-0 z-50 max-w-xs px-3 py-2 mt-1 text-sm text-white break-words whitespace-pre-wrap bg-black rounded shadow-lg top-full">
            {repo.name}
          </div>
        )}

        <span className="ml-4 text-xs text-gray-500 shrink-0">
          ⭐ {repo.stargazers_count}
        </span>
      </div>

      {repo.description && (
        <p className="mt-1 text-sm text-gray-700">{repo.description}</p>
      )}
    </div>
  );
};

export default RepoList;
