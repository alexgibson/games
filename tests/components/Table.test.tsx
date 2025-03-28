import "@testing-library/jest-dom";
import React from "react";
import Table from "../../src/js/components/Table";
import {
  Game,
  Platform,
  Status,
  OneToTen,
  Medium,
} from "../../src/js/types.ts";
import { data } from "../data.ts";
import { render, screen } from "@testing-library/react";

const Games: Game[] = data.map((game) => ({
  ...game,
  platform: game.platform as Platform,
  status: game.status as Status,
  score: game.score as OneToTen,
  medium: game.medium as Medium,
}));

describe("TableRow component", () => {
  it("renders a table of game data", () => {
    render(<Table games={Games} status="Beat" />);
    expect(screen.getByText("Title A")).toBeInTheDocument();
    expect(screen.getByText("Title B")).toBeInTheDocument();
  });
});
