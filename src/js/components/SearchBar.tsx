import React from "react";
import { gameFieldNames } from "../utils";

type SearchBarProps = Omit<
  React.HTMLAttributes<HTMLFormElement>,
  "onChange"
> & {
  placeholder: string;
  value: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClear: () => void;
  ariaControls: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onSubmit,
  onValueChange,
  onFieldChange,
  onClear,
  ariaControls,
}) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label htmlFor="field">Field</label>
      <select id="field" onChange={onFieldChange} aria-controls="search">
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
        onChange={onValueChange}
        placeholder={placeholder}
        aria-controls={ariaControls}
      />
      <button
        className="button-default"
        name="clear"
        type="button"
        disabled={value ? false : true}
        onClick={onClear}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
