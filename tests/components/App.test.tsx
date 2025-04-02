import "@testing-library/jest-dom";
import React from "react";
import App from "../../src/js/components/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    const AppComponent: React.ReactElement = <App />;
    render(AppComponent);
  });

  it("displays active tab content as expected", async () => {
    // "Playing" tab displayed by default.
    const playingButton = screen.getByRole("button", { name: /playing/i });
    expect(playingButton).toHaveClass("active");
    expect(
      screen.queryByRole("table", { name: /playing/i }),
    ).toBeInTheDocument();

    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    expect(playingButton).not.toHaveClass("active");
    expect(
      screen.queryByRole("table", { name: /playing/i }),
    ).not.toBeInTheDocument();

    expect(beatButton).toHaveClass("active");
    expect(screen.queryByRole("table", { name: /beat/i })).toBeInTheDocument();
  });

  it("should filter games by title as expected", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    expect(
      screen.queryByText("The Legend of Zelda: Breath of the Wild"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Super Mario Odyssey")).toBeInTheDocument();

    // Search for "Zelda".
    const searchInput = screen.getByRole("searchbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Zelda{enter}");

    expect(
      screen.queryByText("The Legend of Zelda: Breath of the Wild"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Super Mario Odyssey")).not.toBeInTheDocument();

    // Click "Clear" button.
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(
      screen.queryByText("The Legend of Zelda: Breath of the Wild"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Super Mario Odyssey")).toBeInTheDocument();
  });
});
