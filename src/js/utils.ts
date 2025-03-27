import Games from "./games.ts";
import { Game } from "./types.ts";

/**
 * Sorts a given array of objects by key.
 * @param array the array of objects to be sorted.
 * @param key the object key to sort by.
 * @param ascending defaults to true.
 * @returns sorted array.
 */
export function sortByKey<T, K extends keyof T>(
  array: T[],
  key: K,
  ascending: boolean = true,
): T[] {
  return [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return ascending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return ascending ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
}

/**
 * Filters a given array of objects by key / value.
 * @param array the array of objects to be sorted.
 * @param key the object key to filter by.
 * @param value the value to filter by.
 * @returns filtered array of objects.
 */
export function filterByKey<T, K extends keyof T>(
  array: T[],
  key: K,
  value: string | number,
): T[] {
  return array.filter((item) => {
    const val = value.toString().toLocaleLowerCase();
    if (String(item[key]).toLowerCase().includes(val)) {
      return item;
    }
  });
}

/**
 * Returns a shortened date string.
 * @param date the Date() object to format.
 * @param locale string to format the short date (defaults to en-GB).
 * @returns string using format DD/MM/YYY.
 */
export function formatShortDate(date: Date, locale: string = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}

/**
 * Returns an HTML <tr> string of game data
 * for an individual entry.
 * @param game data object.
 * @returns HTML <tr> string.
 */
export function renderRow(game: Game): string {
  const releaseDate = formatShortDate(game.releaseDate);
  const score = game.score ? game.score : "";

  return `
    <tr>
      <th scope="row" class="col-title">${game.title}</th>
      <td class="col-platform">${game.platform}</td>
      <td class="col-developer">${game.developer}</td>
      <td class="col-release-date">${releaseDate}</td>
      <td class="col-medium">${game.medium}</td>
      <td class="col-score">${score}</td>
    </tr>
  `;
}

/**
 * Returns an HTML <table> string of game data.
 * @param games array of game data objects.
 * @returns HTML <table> string.
 */
export function renderTable(games: typeof Games): string {
  const rows = games.map((game) => renderRow(game)).join("");

  return `
    <table class="mzp-u-data-table">
      <thead>
        <tr>
          <th scope="col" class="col-title">Title</th>
          <th scope="col" class="col-platform">Platform</th>
          <th scope="col" class="col-developer">Developer</th>
          <th scope="col" class="col-release-date">Release Date</th>
          <th scope="col" class="col-medium">Medium</th>
          <th scope="col" class="col-score">Score</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

/**
 * Creates an HTML table in the DOM for an array of games
 * and a given status type.
 * @param games array of game data objects.
 * @param status string of type Status.
 */
export function createDOMTable(games: typeof Games, status: string): void {
  const root = status.toLowerCase();
  const data = filterByKey(games, "status", status);
  const elem = document.getElementById(root) as HTMLElement;
  elem.insertAdjacentHTML("beforeend", renderTable(data));
}
