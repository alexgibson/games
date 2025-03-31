import React from "react";
import TableRow from "./TableRow";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  games: Game[];
  status: string;
};

const Table: React.FC<TableProps> = ({ games, status }) => {
  return (
    <>
      <table id={`${status}-Table`} aria-live="polite">
        <caption>{status}</caption>
        <thead>
          <tr>
            <th scope="col" className="col-title">
              Title
            </th>
            <th scope="col" className="col-platform">
              Platform
            </th>
            <th scope="col" className="col-developer">
              Developer
            </th>
            <th scope="col" className="col-release-date">
              Release Date
            </th>
            <th scope="col" className="col-medium">
              Medium
            </th>
            <th scope="col" className="col-score">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {games.map((props) => (
            <TableRow key={props.title} {...props} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
