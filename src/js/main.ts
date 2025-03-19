import data from "./data.ts";
import { sortByKey, filterByKey } from "./utils.ts";
import { Game } from "./types.ts";

function renderRow(data: Game): string {
  return `
    <tr>
      <th scope="row">${data.title}</th>
      <td>${data.platform}</td>
      <td>${data.developer}</td>
      <td>${data.releaseDate}</td>
      <td>${data.status}</td>
      <td>${data.score}</td>
    </tr>
  `;
}

function render(data: Game[]): string {
  const rows = data.map((game) => renderRow(game)).join("");

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
  const sortedData = sortByKey(data, "title");
  const root = document.getElementById("root") as HTMLElement;

  root.insertAdjacentHTML("beforeend", render(sortedData));
}

init();
