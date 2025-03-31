import React from "react";

type SearchBarProps = React.HTMLAttributes<HTMLFormElement> & {
  placeholder: string;
  value: string;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  ariaControls: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onSearch,
  ariaControls,
}) => {
  return (
    <form onSubmit={onSearch}>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        name="search"
        defaultValue={value ?? ""}
        placeholder={placeholder}
        aria-controls={ariaControls}
      />
      <button name="submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default SearchBar;
