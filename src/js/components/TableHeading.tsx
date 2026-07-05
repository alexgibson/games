import React from "react";

type TableHeadingProps = React.HTMLAttributes<HTMLTableCellElement> & {
  id: FieldName;
  handleButtonClick: (id: FieldName) => void;
};

const TableHeading: React.FC<TableHeadingProps> = ({
  id,
  handleButtonClick,
  className,
  ...props
}) => {
  const colClass = `col-${id.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <th
      key={id}
      scope="col"
      className={`${colClass}${className ? ` ${className}` : ""}`}
      {...props}
    >
      <button
        className="button-table-column"
        type="button"
        onClick={() => handleButtonClick(id)}
        aria-label={`Sort by ${id}`}
      >
        {id}
      </button>
    </th>
  );
};

export default TableHeading;
