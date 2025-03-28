import React from "react";

type DetailsProps = React.HTMLAttributes<HTMLDetailsElement> & {
  title: string;
  children: React.ReactNode;
  open?: boolean;
};

const Details: React.FC<DetailsProps> = ({ title, children, ...props }) => {
  return (
    <details {...props}>
      <summary>
        <h2>{title}</h2>
      </summary>
      {children}
    </details>
  );
};

export default Details;
