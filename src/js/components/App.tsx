import Details from "./Details";
import React from "react";
import Table from "./Table";
import { Status } from "../types.ts";

export default function App() {
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
          <Table status={status}></Table>
        </Details>
      ))}
    </>
  );
}
