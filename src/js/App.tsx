import React from "react";
import Modal, { ModalHandle } from "./components/Modal.tsx";
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
import { useState, useRef } from "react";

type AppProps = {
  games: Game[];
};

const App: React.FC<AppProps> = ({ games }) => {
  const [selectedTab, setSelectedTab] = useState<Status>("Playing");
  const [searchField, setSearchField] = useState<FieldName>("Title");
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortField, setSortField] = useState<FieldName>("Title");
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const dialog = useRef<ModalHandle>(null);

  const searchKey = getGameFieldKey(searchField);
  const sortKey = getGameFieldKey(sortField);

  // all games with wishlist status.
  const wishlistGames: Game[] = filterByKey(games, "status", "Wishlist");

  // all games for currently selected status.
  const statusGames: Game[] = filterByKey(games, "status", selectedTab);

  // all games for currently selected status, sorted by selected field.
  const sortedGames: Game[] = sortByKey(statusGames, sortKey, sortAscending);

  // all games for current status, sorted, and then filtered by search value.
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

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value;

    if (isValidGameField(field)) {
      setSearchField(field);
    }
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSortTable = (id: FieldName) => {
    if (isValidGameField(id)) {
      setSortField(id);
      setSortAscending((prevValue) => !prevValue);
    }
  };

  const handleOpenModal = () => {
    dialog.current.open();
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
        onSearchSubmit={(e) => e.preventDefault()}
        onSearchValueChange={handleSearchValueChange}
        onSearchFieldChange={handleSearchFieldChange}
        onSearchClear={() => setSearchValue("")}
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

      <footer>
        <button
          className="button-default"
          onClick={handleOpenModal}
          aria-controls="modal"
        >
          About this page
        </button>
      </footer>

      <Modal id="modal" ref={dialog}>
        <h2 tabIndex={0}>About</h2>
        <p>
          Video games I’m playing, soon to play, wish to play, or have beaten.
          Current games in library: {games.length - wishlistGames.length}.
        </p>
        <ul>
          <li>
            Author: <a href="https://alxgbsn.co.uk">Alex Gibson</a>
          </li>
          <li>
            Source code:{" "}
            <a href="https://github.com/alexgibson/games">GitHub</a>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default App;
