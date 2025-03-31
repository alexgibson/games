import "@testing-library/jest-dom";
import React from "react";
import Table from "../../src/js/components/Table";
import { data } from "../data/data.ts";
import { render, screen } from "@testing-library/react";

const Games: Game[] = data.map((game) => ({
  ...game,
  platform: game.platform as Platform,
  status: game.status as Status,
  score: game.score as OneToTen,
  medium: game.medium as Medium,
}));

describe("TableRow component", () => {
  it("renders a <table> of game data", () => {
    const component: React.ReactElement = <Table games={Games} status="Beat" />;

    render(component);
    expect(screen.getByText("Title A")).toBeInTheDocument();
    expect(screen.getByText("Title B")).toBeInTheDocument();
  });
});
