import React from "react";

type SearchBarProps = React.HTMLAttributes<HTMLFormElement> & {
  placeholder: string;
  value: string;
  onSearch: React.FormEventHandler<HTMLFormElement>;
  onClear: () => void;
  ariaControls: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onSearch,
  onClear,
  ariaControls,
}) => {
  return (
    <form onSubmit={onSearch}>
      <label htmlFor="search">Search</label>
      <input
        key={value}
        id="search"
        type="search"
        name="search"
        defaultValue={value}
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
