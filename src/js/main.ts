import Games from "./games.ts";
import { sortByKey, filterByKey, formatShortDate } from "./utils.ts";
import { Game } from "./types.ts";

function renderRow(game: Game): string {
  const releaseDate = formatShortDate(game.releaseDate);
  const score = game.score ? game.score : "";

  return `
    <tr>
      <th scope="row" class="col-title">${game.title}</th>
      <td class="col-platform">${game.platform}</td>
      <td class="col-developer">${game.developer}</td>
      <td class="col-release-date">${releaseDate}</td>
      <td class="col-medium">${game.medium}</td>
      <td class="col-status">${game.status}</td>
      <td class="col-score">${score}</td>
    </tr>
  `;
}

function render(games: typeof Games): string {
  const rows = games.map((game) => renderRow(game)).join("");

  return `
    <div class="c-table-container">
      <table class="mzp-u-data-table">
        <thead>
          <tr>
            <th scope="col" class="col-title">Title</th>
            <th scope="col" class="col-platform">Platform</th>
            <th scope="col" class="col-developer">Developer</th>
            <th scope="col" class="col-release-date">Release Date</th>
            <th scope="col" class="col-medium">Medium</th>
            <th scope="col" class="col-status">Status</th>
            <th scope="col" class="col-score">Score</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function init(): void {
  const allGames = sortByKey(Games, "title");

  const playing = filterByKey(allGames, "status", "playing");
  const playingElem = document.getElementById("playing") as HTMLElement;
  playingElem.insertAdjacentHTML("beforeend", render(playing));

  const backlog = filterByKey(allGames, "status", "backlog");
  const backlogElem = document.getElementById("backlog") as HTMLElement;
  backlogElem.insertAdjacentHTML("beforeend", render(backlog));

  const wishlist = filterByKey(allGames, "status", "wishlist");
  const wishlistElem = document.getElementById("wishlist") as HTMLElement;
  wishlistElem.insertAdjacentHTML("beforeend", render(wishlist));

  const beat = filterByKey(allGames, "status", "beat");
  const beatElem = document.getElementById("beat") as HTMLElement;
  beatElem.insertAdjacentHTML("beforeend", render(beat));

  const paused = filterByKey(allGames, "status", "paused");
  const pausedElem = document.getElementById("paused") as HTMLElement;
  pausedElem.insertAdjacentHTML("beforeend", render(paused));
}

init();
