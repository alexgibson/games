import React from "react";

type TabButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  id: string;
  children: React.ReactNode;
  handleOnClick: () => void;
  isActive: boolean;
};

const TabButton: React.FC<TabButtonProps> = ({
  id,
  children,
  handleOnClick,
  isActive,
}) => {
  return (
    <li>
      <button
        type="button"
        id={id}
        className={isActive ? "button-default active" : "button-default"}
        onClick={handleOnClick}
        aria-controls="tab-content"
      >
        {children}
      </button>
    </li>
  );
};

export default TabButton;
