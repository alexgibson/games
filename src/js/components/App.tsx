import Games from "../games.ts";
import React from "react";
import SearchBar from "./SearchBar.tsx";
import TabButton from "./TabButton";
import Table from "./Table";
import { sortByKey, filterByKey } from "../utils.ts";
import { useState } from "react";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Playing");
  const [searchValue, setSearchValue] = useState<string>("");
  const allGames: Game[] = sortByKey(Games, "title");
  const data: Game[] = filterByKey(allGames, "status", selectedTab);
  const filteredData: Game[] = filterByKey(data, "title", searchValue);
  const allStatus: Status[] = [
    "Playing",
    "Backlog",
    "Wishlist",
    "Beat",
    "Paused",
  ];

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const searchValue = formData.get("search") as string;
    setSearchValue(searchValue);
  };

  function handleTabSelect(selectedTab: string) {
    setSelectedTab(selectedTab);
  }

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
      <SearchBar
        placeholder="Search by game title"
        value={searchValue}
        onSearch={handleSearch}
        onClear={() => setSearchValue("")}
        ariaControls={`${selectedTab}-Table`}
      />
      <div
        role="tabpanel"
        id="tab-content"
        aria-labelledby={`${selectedTab}-TabButton`}
      >
        <Table games={filteredData} status={selectedTab}></Table>
      </div>
    </>
  );
};

export default App;
