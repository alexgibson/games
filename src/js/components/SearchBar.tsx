import React from "react";
import { use } from "react";
import { gameFieldNames } from "../utils";
import { GamesContext } from "../store/GamesContextProvider";

type SearchBarProps = Omit<React.HTMLAttributes<HTMLFormElement>, "onChange">;

const SearchBar: React.FC<SearchBarProps> = () => {
  const gamesCtx = use(GamesContext);

  return (
    <form
      id="search-form"
      className="search-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        name="search"
        autoFocus
        value={gamesCtx.searchQuery}
        onChange={(e) => gamesCtx.handleUpdateSearchQuery(e.target.value)}
        placeholder="Search"
        aria-controls={`${gamesCtx.activeTabButton}-Table`}
      />
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
