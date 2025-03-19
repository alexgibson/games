import Games from "./games.ts";
import { sortByKey, filterByKey } from "./utils.ts";
import { Game } from "./types.ts";

function renderRow(game: Game): string {
  return `
    <tr>
      <th scope="row">${game.title}</th>
      <td>${game.platform}</td>
      <td>${game.developer}</td>
      <td>${game.releaseDate}</td>
      <td>${game.status}</td>
      <td>${game.score}</td>
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
  //const filteredData = filterByKey(data, "title", "Zelda");
  const sortedData = sortByKey(Games, "title");
  const root = document.getElementById("root") as HTMLElement;

  root.insertAdjacentHTML("beforeend", render(sortedData));
}

init();
