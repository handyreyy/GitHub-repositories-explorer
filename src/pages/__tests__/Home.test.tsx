import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as githubApi from "../../services/githubApi";
import Home from "../Home";

vi.mock("../../services/githubApi");

const mockUsers = [
  {
    login: "handydev",
    avatar_url: "https://example.com/avatar.png",
    html_url: "https://github.com/handydev",
  },
];

describe("Home page", () => {
  it("renders SearchBar and fetches users correctly", async () => {
    vi.spyOn(githubApi, "searchUsers").mockResolvedValueOnce(mockUsers);

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.change(input, { target: { value: "handydev" } });

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/showing users for/i)).toBeInTheDocument();
      expect(screen.getByText("handydev")).toBeInTheDocument();
    });
  });
});
