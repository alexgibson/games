import React from "react";
import Modal from "./components/Modal.tsx";
import SearchBar from "./components/SearchBar.tsx";
import TabButton from "./components/TabButton";
import Table from "./components/Table";
import { gameStatus } from "./utils.ts";
import { useContext } from "react";
import { GamesContext } from "./store/GamesContextProvider";

const App: React.FC = () => {
  const gamesCtx = useContext(GamesContext);

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

      <SearchBar />

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
          About this app
        </button>
      </footer>

      <Modal id="modal">
        <h2 tabIndex={0}>About this app</h2>
        <p>
          Video games I’m playing, soon to play, wish to play, or have beaten.
        </p>
        <p>Total games in library: {gamesCtx.gamesInLibrary}</p>
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
