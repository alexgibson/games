import React from "react";

type TabButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  id: string;
  children: React.ReactNode;
  onSelect: () => void;
  isSelected: boolean;
};

const TabButton: React.FC<TabButtonProps> = ({
  id,
  children,
  onSelect,
  isSelected,
}) => {
  return (
    <li>
      <button
        type="button"
        id={id}
        className={isSelected ? "active" : undefined}
        onClick={onSelect}
        aria-controls="tab-content"
      >
        {children}
      </button>
    </li>
  );
};

export default TabButton;
