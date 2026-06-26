import "@testing-library/jest-dom";
import App from "../src/js/App";
import Games from "./games.ts";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import GamesContextProvider from "../src/js/store/GamesContextProvider";

describe("App component", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    /**
     * Polyfill for showModal() and close() since <dialog>
     * is not yet natively supported by JSDOM.
     */
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", "true");
    };

    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
    };
  });

  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    const AppComponent: React.ReactElement = <App />;
    render(
      <GamesContextProvider initialGames={Games}>
        {AppComponent}
      </GamesContextProvider>,
    );
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it("displays active tab content as expected", async () => {
    // "Backlog" tab displayed by default.
    const backlogButton = screen.getByRole("button", { name: /backlog/i });
    expect(backlogButton).toHaveClass("active");

    expect(screen.queryByText(/Games: 1/i)).toBeInTheDocument();

    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    expect(backlogButton).not.toHaveClass("active");
    expect(screen.queryByText(/Games: 1/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Games: 3/i)).toBeInTheDocument();

    expect(beatButton).toHaveClass("active");
  });

  it("should filter games by title as expected", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    expect(screen.queryByText("Title C")).toBeInTheDocument();
    expect(screen.queryByText("Title D")).toBeInTheDocument();
    expect(screen.queryByText("Title E")).toBeInTheDocument();

    expect(screen.queryByText(/Games: 3/i)).toBeInTheDocument();

    // Reveal the search form.
    await user.click(screen.getByRole("button", { name: /show search/i }));

    // Search for "Title D".
    const searchInput = screen.getByRole("searchbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Title D{enter}");

    expect(screen.queryByText("Title C")).not.toBeInTheDocument();
    expect(screen.queryByText("Title D")).toBeInTheDocument();
    expect(screen.queryByText("Title E")).not.toBeInTheDocument();

    expect(screen.queryByText(/Games: 1/i)).toBeInTheDocument();

    // Click "Clear" button.
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(screen.queryByText("Title C")).toBeInTheDocument();
    expect(screen.queryByText("Title D")).toBeInTheDocument();
    expect(screen.queryByText("Title E")).toBeInTheDocument();

    expect(screen.queryByText(/Games: 3/i)).toBeInTheDocument();
  });

  it("should filter games by medium as expected", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    let digital = screen.queryAllByText(/Digital/i);
    expect(digital.length).toBe(1);

    let physical = screen.queryAllByText(/Physical/i);
    expect(physical.length).toBe(2);

    expect(screen.queryByText(/Games: 3/i)).toBeInTheDocument();

    // Reveal the search form.
    await user.click(screen.getByRole("button", { name: /show search/i }));

    // Select table column "Medium"
    const selectInput = screen.getByRole("combobox", {
      name: /table column/i,
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

    expect(screen.queryByText(/Games: 1/i)).toBeInTheDocument();
  });

  it("should sort by table column (ascending)", async () => {
    // Switch to "Beat" tab.
    const beatButton = screen.getByRole("button", { name: /beat/i });
    await user.click(beatButton);

    // Get all table rows, skipping header and footer.
    const rows = screen.getAllByRole("row").slice(1, -1);

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

    // Get all table rows, skipping header and footer.
    const rows = screen.getAllByRole("row").slice(1, -1);

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

  it("should show modal dialog when about button is clicked", async () => {
    const aboutButton = screen.getByRole("button", {
      name: /About/i,
    });
    const dialog = screen.getByTestId("modal");

    expect(
      within(dialog).queryByText(/Total games: 5/i),
    ).not.toBeInTheDocument();

    // Open about modal
    await user.click(aboutButton);

    expect(within(dialog).getByText(/Total games: 6/i)).toBeVisible();
  });
});
