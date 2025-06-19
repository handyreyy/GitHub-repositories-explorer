import axios from "axios";
import type { GitHubRepo } from "../types/Repo";
import type { GitHubUser } from "../types/User";

const github = axios.create({
  baseURL: "https://api.github.com",
});

export const searchUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await github.get("/search/users", {
    params: {
      q: query,
      per_page: 5,
    },
  });
  return response.data.items;
};

export const getUserRepos = async (
  username: string,
  page = 1,
  per_page = 5
): Promise<GitHubRepo[]> => {
  const response = await github.get(`/users/${username}/repos`, {
    params: { page, per_page },
  });
  return response.data;
};
