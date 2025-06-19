import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithQueryClient } from "../../test/utils";
import type { GitHubUser } from "../../types/User";
import UserCard from "../UserCard";

const mockUser: GitHubUser = {
  login: "handydev",
  avatar_url: "https://avatar.url/handy",
  html_url: "https://github.com/handydev",
};

describe("UserCard", () => {
  it("renders user basic info correctly", () => {
    renderWithQueryClient(
      <UserCard user={mockUser} onFetchUserRepos={vi.fn()} />
    );

    expect(screen.getByText("handydev")).toBeInTheDocument();
  });
});
