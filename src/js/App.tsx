import React from "react";
import Modal, { ModalHandle } from "./components/Modal.tsx";
import SearchBar from "./components/SearchBar.tsx";
import TabButton from "./components/TabButton";
import Table from "./components/Table";
import { gameStatus } from "./utils.ts";
import { useRef, useContext } from "react";
import { GamesContext } from "./store/GamesContextProvider";

const App: React.FC = () => {
  const gamesCtx = useContext(GamesContext);
  const dialog = useRef<ModalHandle>(null);

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
            isSelected={gamesCtx.activeTabButton === status}
            onSelect={() => gamesCtx.handleUpdateActiveTabButton(status)}
          >
            {status}
          </TabButton>
        ))}
      </menu>

      <SearchBar
        value={gamesCtx.searchQuery}
        ariaControls={`${gamesCtx.activeTabButton}-Table`}
      />

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
          Current games in library: {gamesCtx.gamesInLibrary}.
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
