import React from "react";
import SearchBar from "./components/SearchBar.tsx";
import TabButton from "./components/TabButton";
import Table from "./components/Table";
import {
  sortByKey,
  filterByKey,
  gameStatus,
  isValidGameStatus,
  isValidGameField,
  getGameFieldKey,
} from "./utils.ts";
import { useState } from "react";

type AppProps = {
  games: Game[];
};

const App: React.FC<AppProps> = ({ games }) => {
  const [selectedTab, setSelectedTab] = useState<Status>("Playing");
  const [searchField, setSearchField] = useState<FieldName>("Title");
  const [sortField, setSortField] = useState<FieldName>("Title");
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const statusGames: Game[] = filterByKey(games, "status", selectedTab);
  const sortKey = getGameFieldKey(sortField);
  const sortedGames: Game[] = sortByKey(statusGames, sortKey, sortAscending);
  const searchKey = getGameFieldKey(searchField);
  const filteredGames: Game[] = filterByKey(
    sortedGames,
    searchKey,
    searchValue,
  );

  const handleTabSelect = (status: string) => {
    if (isValidGameStatus(status)) {
      setSelectedTab(status);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value;

    if (isValidGameField(field)) {
      setSearchField(field);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSortTable = (id: FieldName) => {
    if (isValidGameField(id)) {
      setSortField(id);
      setSortAscending((prevValue) => !prevValue);
    }
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
        <Table
          games={filteredGames}
          status={selectedTab}
          onSortTable={handleSortTable}
          sortField={sortField}
          sortAscending={sortAscending}
        ></Table>
      </div>
    </>
  );
};

export default App;
