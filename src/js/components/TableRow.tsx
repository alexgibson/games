import React from "react";
import { formatShortDate } from "../utils.ts";
import { Game } from "../types.ts";

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> &
  Omit<Game, "status">;

const TableRow: React.FC<TableRowProps> = ({
  title,
  platform,
  developer,
  releaseDate,
  medium,
  score,
}) => {
  return (
    <tr>
      <th scope="row" className="col-title">
        {title}
      </th>
      <td className="col-platform">{platform}</td>
      <td className="col-developer">{developer}</td>
      <td className="col-release-date">{formatShortDate(releaseDate)}</td>
      <td className="col-medium">{medium}</td>
      <td className="col-score">{score ? score : ""}</td>
    </tr>
  );
};

export default TableRow;
