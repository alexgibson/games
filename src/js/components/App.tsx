import Games from "../games.ts";
import React from "react";
import TabButton from "./TabButton";
import Table from "./Table";
import { useState } from "react";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Playing");

  function handleTabSelect(selectedTab) {
    setSelectedTab(selectedTab);
  }

  const allStatus: Status[] = [
    "Playing",
    "Backlog",
    "Wishlist",
    "Beat",
    "Paused",
  ];

  const tabContent = <Table games={Games} status={selectedTab}></Table>;

  return (
    <>
      <menu role="tablist" aria-label="Game Status">
        {allStatus.map((status: string) => (
          <TabButton
            key={status}
            id={`${status}-TabButton`}
            isSelected={selectedTab === status}
            onSelect={() => handleTabSelect(status)}
          >
            {status}
          </TabButton>
        ))}
      </menu>
      <div
        role="tabpanel"
        id="tab-content"
        aria-labelledby={`${selectedTab}-TabButton`}
      >
        {tabContent}
      </div>
    </>
  );
};

export default App;
