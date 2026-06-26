import React from "react";
import Modal from "./components/Modal.tsx";
import SearchBar from "./components/SearchBar.tsx";
import TabButton from "./components/TabButton";
import Table from "./components/Table";
import { gameStatus } from "./utils.ts";
import { use } from "react";
import { GamesContext } from "./store/GamesContextProvider";

const App: React.FC = () => {
  const gamesCtx = use(GamesContext);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleToggleSearch = () => {
    // Clear any active query when hiding so the search stops filtering.
    if (isSearchOpen) {
      gamesCtx.handleUpdateSearchQuery("");
    }
    setIsSearchOpen((open) => !open);
  };

  return (
    <>
      <menu role="tablist" aria-label="Game Status">
        {gameStatus.map((status: string) => (
          <TabButton
            key={status}
            id={`${status}-TabButton`}
            isActive={gamesCtx.activeTabButton === status}
            handleOnClick={() => gamesCtx.handleUpdateActiveTabButton(status)}
          >
            {status}
          </TabButton>
        ))}
      </menu>

      <div className="table-header">
        <p className="game-count" aria-live="polite">
          Games: {gamesCtx.games.length}
        </p>
        <div className="search-bar">
          {isSearchOpen && <SearchBar />}
          <button
            className="button-default search-toggle"
            type="button"
            aria-expanded={isSearchOpen}
            aria-controls="search-form"
            aria-label={isSearchOpen ? "Hide search" : "Show search"}
            onClick={handleToggleSearch}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      <div
        role="tabpanel"
        id="tab-content"
        aria-labelledby={`${gamesCtx.activeTabButton}-TabButton`}
      >
        <Table />
      </div>

      <footer>
        <button
          className="button-default"
          onClick={() => gamesCtx.handleUpdateModalVisibility(true)}
          aria-controls="modal"
        >
          About
        </button>
      </footer>

      <Modal id="modal">
        <h2 tabIndex={0}>About</h2>
        <p>
          Games that I'm either actively playing, are in my backlog, on my
          wishlist, or have beaten.
        </p>
        <p>Total games: {gamesCtx.gamesInLibrary}</p>
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
