import React, { useState } from "react";

type DetailsProps = React.HTMLAttributes<HTMLDetailsElement> & {
  title: string;
  children: React.ReactNode;
  open?: boolean;
};

const Details: React.FC<DetailsProps> = ({ title, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <details open={isOpen} {...props}>
      <summary>
        <h2 onClick={toggle}>{title}</h2>
      </summary>
      {children}
    </details>
  );
};

export default Details;
