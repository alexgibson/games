import React from "react";
import { useContext } from "react";
import { gameFieldNames } from "../utils";
import { GamesContext } from "../store/GamesContextProvider";

type SearchBarProps = Omit<React.HTMLAttributes<HTMLFormElement>, "onChange">;

const SearchBar: React.FC<SearchBarProps> = () => {
  const gamesCtx = useContext(GamesContext);

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="field">Table Column</label>
      <select
        id="field"
        onChange={(e) => gamesCtx.handleUpdateSearchFieldOption(e.target.value)}
        aria-controls="search"
      >
        {gameFieldNames.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        name="search"
        value={gamesCtx.searchQuery}
        onChange={(e) => gamesCtx.handleUpdateSearchQuery(e.target.value)}
        placeholder="Search term"
        aria-controls={`${gamesCtx.activeTabButton}-Table`}
      />
      <button
        className="button-default"
        name="clear"
        type="button"
        disabled={gamesCtx.searchQuery ? false : true}
        onClick={() => gamesCtx.handleUpdateSearchQuery("")}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
