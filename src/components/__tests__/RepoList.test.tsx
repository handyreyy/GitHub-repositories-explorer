import { render, screen } from "@testing-library/react";
import type { GitHubRepo } from "../../types/Repo";
import RepoList from "../RepoList";

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "github-explorer",
    html_url: "https://github.com/handy/github-explorer",
    description: "A tool to explore GitHub users and repositories",
    stargazers_count: 42,
  },
  {
    id: 2,
    name: "vitest-learning",
    html_url: "https://github.com/handy/vitest-learning",
    description: "",
    stargazers_count: 7,
  },
];

describe("RepoList", () => {
  it("renders all repositories correctly", () => {
    render(<RepoList repos={mockRepos} />);

    expect(screen.getByText("github-explorer")).toBeInTheDocument();
    expect(screen.getByText("vitest-learning")).toBeInTheDocument();

    expect(
      screen.getByText("A tool to explore GitHub users and repositories")
    ).toBeInTheDocument();

    expect(screen.getByText(/⭐ 42/)).toBeInTheDocument();
    expect(screen.getByText(/⭐ 7/)).toBeInTheDocument();
  });

  it("does not render description if empty", () => {
    render(<RepoList repos={mockRepos} />);
    expect(
      screen.queryByText(
        (content, element) =>
          content.includes("vitest-learning") &&
          element?.tagName.toLowerCase() === "p"
      )
    ).not.toBeInTheDocument();
  });
});
