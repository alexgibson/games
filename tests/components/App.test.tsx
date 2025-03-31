import "@testing-library/jest-dom";
import React from "react";
import App from "../../src/js/components/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  it("renders the app correctly", async () => {
    const user = userEvent.setup();
    const AppComponent: React.ReactElement = <App />;

    render(AppComponent);

    const playingButton = screen.getByRole("button", { name: /playing/i });
    expect(playingButton).toHaveClass("active");
    expect(screen.getByRole("table", { name: /playing/i })).toBeInTheDocument();

    const backlogButton = screen.getByRole("button", { name: /backlog/i });
    await user.click(backlogButton);

    expect(playingButton).not.toHaveClass("active");
    expect(backlogButton).toHaveClass("active");
    expect(screen.getByRole("table", { name: /backlog/i })).toBeInTheDocument();
  });
});
