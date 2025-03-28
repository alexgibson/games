import Games from "../games.ts";
import React from "react";
import TableRow from "./TableRow";
import { sortByKey, filterByKey } from "../utils.ts";
import { Game } from "../types.ts";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  status: string;
};

const Table: React.FC<TableProps> = ({ status }) => {
  const allGames: Game[] = sortByKey(Games, "title");
  const data: Game[] = filterByKey(allGames, "status", status);

  return (
    <>
      <table id={status}>
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
          {data.map((props) => (
            <TableRow key={props.title} {...props} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
