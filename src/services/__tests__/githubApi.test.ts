import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockGet } from "../../../__mocks__/axios";

vi.mock("axios");

import { getUserRepos, searchUsers } from "../githubApi";

describe("githubApi", () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it("searchUsers should return GitHub users based on query", async () => {
    const mockUsers = [
      { login: "handydev", avatar_url: "https://", html_url: "https://" },
    ];

    mockGet.mockResolvedValueOnce({
      data: {
        items: mockUsers,
      },
    });

    const result = await searchUsers("handydev");

    expect(mockGet).toHaveBeenCalledWith("/search/users", {
      params: { q: "handydev", per_page: 5 },
    });
    expect(result).toEqual(mockUsers);
  });

  it("getUserRepos should return user repositories with pagination", async () => {
    const mockRepos = [
      {
        id: 123,
        name: "repo-test",
        html_url: "https://github.com/handydev/repo-test",
        description: "desc",
        stargazers_count: 1,
      },
    ];

    mockGet.mockResolvedValueOnce({
      data: mockRepos,
    });

    const result = await getUserRepos("handydev", 2, 5);

    expect(mockGet).toHaveBeenCalledWith("/users/handydev/repos", {
      params: { page: 2, per_page: 5 },
    });
    expect(result).toEqual(mockRepos);
  });
});
