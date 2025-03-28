import "@testing-library/jest-dom";
import React from "react";
import Details from "../../src/js/components/Details";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Details component", () => {
  it("renders a <details> component that can be toggled", async () => {
    const user = userEvent.setup();

    const component: React.ReactElement = (
      <Details title="Playing" open={true}>
        Hello World
      </Details>
    );

    render(component);
    const details = screen.getByText("Playing").closest("details");

    expect(details).toHaveAttribute("open");
    expect(screen.getByText("Hello World")).toBeInTheDocument();

    const summary = screen.getByText("Playing");
    await user.click(summary);

    expect(details).not.toHaveAttribute("open");

    await user.click(summary);
    expect(details).toHaveAttribute("open");
  });
});
