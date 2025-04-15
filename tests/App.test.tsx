import "@testing-library/jest-dom";
import App from "../src/js/App";
import Games from "./games.ts";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";

describe("App component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    const AppComponent: React.ReactElement = <App games={Games} />;
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

    expect(screen.queryByText("Title C")).toBeInTheDocument();
    expect(screen.queryByText("Title D")).toBeInTheDocument();
    expect(screen.queryByText("Title E")).toBeInTheDocument();

    // Search for "Title D".
    const searchInput = screen.getByRole("searchbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Title D{enter}");

    expect(screen.queryByText("Title C")).not.toBeInTheDocument();
    expect(screen.queryByText("Title D")).toBeInTheDocument();
    expect(screen.queryByText("Title E")).not.toBeInTheDocument();

    // Click "Clear" button.
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(screen.queryByText("Title C")).toBeInTheDocument();
    expect(screen.queryByText("Title D")).toBeInTheDocument();
    expect(screen.queryByText("Title E")).toBeInTheDocument();
  });

  it("should filter games by medium as expected", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    let digital = screen.queryAllByText(/Digital/i);
    expect(digital.length).toBe(1);

    let physical = screen.queryAllByText(/Physical/i);
    expect(physical.length).toBe(2);

    // Select field "Medium"
    const selectInput = screen.getByRole("combobox", {
      name: /field/i,
    });
    await userEvent.selectOptions(selectInput, "Medium");

    // Search for "Digital".
    const searchInput = screen.getByRole("searchbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Digital{enter}");

    digital = screen.queryAllByText(/Digital/i);
    expect(digital.length).toBe(1);

    physical = screen.queryAllByText(/Physical/i);
    expect(physical.length).toBe(0);
  });

  it("should sort by table column (ascending)", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    // Get all table rows, skipping header
    const rows = screen.getAllByRole("row").slice(1);

    // Get all "Title" cells.
    const titleCells = rows.map((row) => {
      return within(row).getByRole("rowheader");
    });

    // Get cell text content.
    const titles = titleCells.map((cell) => cell.textContent?.trim() || "");

    // Create a duplicate, ascending array.
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));

    // Compare the two arrays.
    expect(titles).toEqual(sorted);
  });

  it("should sort by table column (descending)", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    // Click "Title" column button, to switch to descending order.
    const titleButton = screen.getByRole("button", { name: /title/i });
    await user.click(titleButton);

    // Get all table rows, skipping header,
    const rows = screen.getAllByRole("row").slice(1);

    // Get all "Title" cells.
    const titleCells = rows.map((row) => {
      return within(row).getByRole("rowheader");
    });

    // Get cell text content.
    const titles = titleCells.map((cell) => cell.textContent?.trim() || "");

    // Create a duplicate, descending array.
    const sorted = [...titles].sort((a, b) => b.localeCompare(a));

    // Compare the two arrays.
    expect(titles).toEqual(sorted);
  });
});
