import React from "react";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import { gameFieldNames } from "../utils";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  games: Game[];
  status: string;
  onSortTable: (field: FieldName) => void;
  sortField: FieldName;
  sortAscending: boolean;
};

const Table: React.FC<TableProps> = ({
  games,
  status,
  onSortTable,
  sortField,
  sortAscending,
}) => {
  const order = sortAscending ? "ascending" : "descending";
  return (
    <>
      <table id={`${status}-Table`} aria-live="polite">
        <caption>{status}</caption>
        <thead>
          <tr>
            {gameFieldNames.map((field) => (
              <TableHeading
                key={field}
                id={field}
                handleButtonClick={onSortTable}
                className={sortField === field ? `active-${order}` : undefined}
                aria-sort={sortField === field ? order : undefined}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {games.map((props) => (
            <TableRow key={props.title} {...props} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Total games: {games.length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Table;
