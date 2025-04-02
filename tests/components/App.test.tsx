import "@testing-library/jest-dom";
import React from "react";
import App from "../../src/js/components/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  it("renders the app data correctly", async () => {
    const user = userEvent.setup();
    const AppComponent: React.ReactElement = <App />;

    render(AppComponent);

    const playingButton = screen.getByRole("button", { name: /playing/i });
    expect(playingButton).toHaveClass("active");
    expect(screen.getByRole("table", { name: /playing/i })).toBeInTheDocument();

    // switch tabs
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    expect(playingButton).not.toHaveClass("active");
    expect(beatButton).toHaveClass("active");
    expect(screen.getByRole("table", { name: /beat/i })).toBeInTheDocument();
    expect(
      screen.queryByText("The Legend of Zelda: Breath of the Wild"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Super Mario Odyssey")).toBeInTheDocument();

    // search for title
    const searchInput = screen.getByRole("searchbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Zelda{enter}");

    expect(
      screen.queryByText("The Legend of Zelda: Breath of the Wild"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Super Mario Odyssey")).not.toBeInTheDocument();

    // clear search filter
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(
      screen.queryByText("The Legend of Zelda: Breath of the Wild"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Super Mario Odyssey")).toBeInTheDocument();
  });
});
