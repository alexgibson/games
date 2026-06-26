import React from "react";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import { gameFieldNames } from "../utils";
import { use } from "react";
import { GamesContext } from "../store/GamesContextProvider";

type TableProps = React.HTMLAttributes<HTMLTableElement>;

const Table: React.FC<TableProps> = () => {
  const gamesCtx = use(GamesContext);
  const order = gamesCtx.sortAscending ? "ascending" : "descending";

  return (
    <div className="table-wrapper">
      <table id={`${gamesCtx.activeTabButton}-Table`} aria-live="polite">
        <caption>Games: {gamesCtx.games.length}</caption>
        <thead>
          <tr>
            {gameFieldNames.map((field) => (
              <TableHeading
                key={field}
                id={field}
                handleButtonClick={gamesCtx.handleSortGames}
                className={
                  gamesCtx.sortField === field ? `active-${order}` : undefined
                }
                aria-sort={gamesCtx.sortField === field ? order : undefined}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {gamesCtx.games.map((props) => (
            <TableRow key={props.title} {...props} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
