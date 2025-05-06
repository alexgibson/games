import React from "react";

type TableHeadingProps = React.HTMLAttributes<HTMLTableCellElement> & {
  id: FieldName;
  handleButtonClick: (id: FieldName) => void;
};

const TableHeading: React.FC<TableHeadingProps> = ({
  id,
  handleButtonClick,
  ...props
}) => {
  return (
    <th key={id} scope="col" className={`col-${id}`} {...props}>
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
