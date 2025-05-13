import React from "react";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import { gameFieldNames } from "../utils";
import { useContext } from "react";
import { GamesContext } from "../store/GamesContextProvider";

type TableProps = React.HTMLAttributes<HTMLTableElement>;

const Table: React.FC<TableProps> = () => {
  const gamesCtx = useContext(GamesContext);
  const order = gamesCtx.sortAscending ? "ascending" : "descending";

  return (
    <>
      <table id={`${gamesCtx.activeTabButton}-Table`} aria-live="polite">
        <caption>{gamesCtx.activeTabButton}</caption>
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
        <tfoot>
          <tr>
            <td colSpan={6}>Total games: {gamesCtx.games.length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Table;
