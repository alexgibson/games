import Games from "./games.ts";
import { sortByKey, createDOMTable } from "./utils.ts";
import { Status } from "./types.ts";

function init(): void {
  const allGames = sortByKey(Games, "title");
  const allStatus: Status[] = [
    "Playing",
    "Backlog",
    "Wishlist",
    "Beat",
    "Paused",
  ];

  allStatus.forEach((status: string): void => {
    createDOMTable(allGames, status);
  });
}

init();
