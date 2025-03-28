import Details from "./Details";
import React, { useState } from "react";
import Table from "./Table";
import { Status } from "../types.ts";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(e.currentTarget.open);
  };

  const allStatus: Status[] = [
    "Playing",
    "Backlog",
    "Wishlist",
    "Beat",
    "Paused",
  ];

  return (
    <>
      {allStatus.map((status: string) => (
        <Details
          key={status}
          title={status}
          open={isOpen}
          onClick={handleToggle}
        >
          <Table status={status}></Table>
        </Details>
      ))}
    </>
  );
}
