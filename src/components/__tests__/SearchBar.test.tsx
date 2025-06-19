import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders input and button correctly", () => {
    render(
      <SearchBar
        input=""
        onInputChange={() => {}}
        onSearch={() => {}}
        loading={false}
      />
    );
    expect(
      screen.getByPlaceholderText("Search GitHub users...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls onInputChange when input changes", () => {
    const handleChange = vi.fn();
    render(
      <SearchBar
        input=""
        onInputChange={handleChange}
        onSearch={() => {}}
        loading={false}
      />
    );
    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("calls onSearch when button is clicked", () => {
    const handleSearch = vi.fn();
    render(
      <SearchBar
        input=""
        onInputChange={() => {}}
        onSearch={handleSearch}
        loading={false}
      />
    );
    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);
    expect(handleSearch).toHaveBeenCalled();
  });

  it("calls onSearch when Enter key is pressed", () => {
    const handleSearch = vi.fn();
    render(
      <SearchBar
        input=""
        onInputChange={() => {}}
        onSearch={handleSearch}
        loading={false}
      />
    );
    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleSearch).toHaveBeenCalled();
  });

  it("disables the button while loading", () => {
    render(
      <SearchBar
        input=""
        onInputChange={() => {}}
        onSearch={() => {}}
        loading={true}
      />
    );
    const button = screen.getByRole("button", { name: "Searching..." });
    expect(button).toBeDisabled();
  });
});
