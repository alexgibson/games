import React from "react";
import { gameFieldNames } from "../utils";

type SearchBarProps = Omit<
  React.HTMLAttributes<HTMLFormElement>,
  "onChange"
> & {
  placeholder: string;
  value: string;
  onSearchSubmit: React.FormEventHandler<HTMLFormElement>;
  onSearchValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchClear: () => void;
  ariaControls: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onSearchSubmit,
  onSearchValueChange,
  onSearchFieldChange,
  onSearchClear,
  ariaControls,
}) => {
  return (
    <form className="search-form" onSubmit={onSearchSubmit}>
      <label htmlFor="field">Field</label>
      <select id="field" onChange={onSearchFieldChange} aria-controls="search">
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
        value={value}
        onChange={onSearchValueChange}
        placeholder={placeholder}
        aria-controls={ariaControls}
      />
      <button
        className="button-default"
        name="clear"
        type="button"
        disabled={value ? false : true}
        onClick={onSearchClear}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
