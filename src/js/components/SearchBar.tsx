import React from "react";
import { gameFields } from "../utils.ts";

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
    <form onSubmit={onSubmit}>
      <label htmlFor="field">Field</label>
      <select id="field" onChange={onFieldChange} aria-controls="search">
        {Object.entries(gameFields).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
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
