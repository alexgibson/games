import Games from "./games.ts";
import { sortByKey, filterByKey, formatShortDate } from "./utils.ts";
import { Game } from "./types.ts";

function renderRow(game: Game): string {
  const releaseDate = formatShortDate(game.releaseDate);
  const score = game.score ? game.score : "";

  return `
    <tr>
      <th scope="row">${game.title}</th>
      <td>${game.platform}</td>
      <td>${game.developer}</td>
      <td>${releaseDate}</td>
      <td>${game.medium}</td>
      <td>${game.status}</td>
      <td>${score}</td>
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
            <th scope="col">Title</th>
            <th scope="col">Platform</th>
            <th scope="col">Developer</th>
            <th scope="col">Release Date</th>
            <th scope="col">Medium</th>
            <th scope="col">Status</th>
            <th scope="col">Score</th>
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

  const beat = filterByKey(allGames, "status", "beat");
  const beatElem = document.getElementById("beat") as HTMLElement;
  beatElem.insertAdjacentHTML("beforeend", render(beat));

  const paused = filterByKey(allGames, "status", "paused");
  const pausedElem = document.getElementById("paused") as HTMLElement;
  pausedElem.insertAdjacentHTML("beforeend", render(paused));
}

init();
