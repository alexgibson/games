import React from "react";

type SearchBarProps = Omit<
  React.HTMLAttributes<HTMLFormElement>,
  "onChange"
> & {
  placeholder: string;
  value: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  ariaControls: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onSubmit,
  onChange,
  onClear,
  ariaControls,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        name="search"
        value={value}
        onChange={onChange}
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
