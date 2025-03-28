import Details from "./Details";
import Games from "../games.ts";
import React from "react";
import Table from "./Table";

const App: React.FC = () => {
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
        <Details key={status} title={status} open={true}>
          <Table games={Games} status={status}></Table>
        </Details>
      ))}
    </>
  );
};

export default App;
