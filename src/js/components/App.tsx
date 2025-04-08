import Games from "../games.ts";
import React from "react";
import SearchBar from "./SearchBar.tsx";
import TabButton from "./TabButton";
import Table from "./Table";
import {
  sortByKey,
  filterByKey,
  gameStatus,
  isValidGameStatus,
  isValidGameField,
} from "../utils.ts";
import { useState } from "react";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Status>("Playing");
  const [searchField, setSearchField] = useState<GameField>("title");
  const [searchValue, setSearchValue] = useState<string>("");
  const allGames: Game[] = sortByKey(Games, "title");
  const statusGames: Game[] = filterByKey(allGames, "status", selectedTab);
  const filteredGames: Game[] = filterByKey(
    statusGames,
    searchField,
    searchValue,
  );

  const handleTabSelect = (status: string) => {
    if (isValidGameStatus(status)) {
      setSelectedTab(status);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isValidGameField(value)) {
      setSearchField(value);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <menu role="tablist" aria-label="Game Status">
        {gameStatus.map((status: string) => (
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
        placeholder="Search by field"
        value={searchValue}
        onSubmit={(e) => e.preventDefault()}
        onValueChange={handleValueChange}
        onFieldChange={handleFieldChange}
        onClear={() => setSearchValue("")}
        ariaControls={`${selectedTab}-Table`}
      />
      <div
        role="tabpanel"
        id="tab-content"
        aria-labelledby={`${selectedTab}-TabButton`}
      >
        <Table games={filteredGames} status={selectedTab}></Table>
      </div>
    </>
  );
};

export default App;
