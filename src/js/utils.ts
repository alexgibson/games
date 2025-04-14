/**
 * Returns true if given value is a valid Date() object.
 * @param value
 * @returns boolean
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Takes an array of objects and returns a new copy
 * of the array, sorted ascending or descending by key.
 * @param array of objects to be sorted.
 * @param key to sort by.
 * @param ascending (defaults to true).
 * @returns sorted array.
 */
export function sortByKey<T, K extends keyof T>(
  array: T[],
  key: K,
  ascending: boolean = true,
): T[] {
  return [...array]
    .sort((a, b) => {
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

      if (isDate(valueA) && isDate(valueB)) {
        return ascending
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      return 0;
    })
    .map((obj) => ({ ...obj }));
}

/**
 * Takes an array of objects and returns a new copy
 * of the array, filtered by key / value pair.
 * @param array of objects to be filtered.
 * @param key to filter by.
 * @param value to filter by.
 * @returns filtered array.
 */
export function filterByKey<T, K extends keyof T>(
  array: T[],
  key: K,
  value: string | number,
): T[] {
  if (!value) {
    return array;
  }

  return array
    .filter((item) => {
      const val = value.toString().toLocaleLowerCase();
      if (String(item[key]).toLowerCase().includes(val)) {
        return item;
      }
    })
    .map((obj) => ({ ...obj }));
}

/**
 * Takes a Date() object and returns a short date string,
 * formatted by locale code.
 * @param date object to format.
 * @param locale string (defaults to en-GB).
 * @returns string format DD/MM/YYY.
 */
export function formatShortDate(date: Date, locale: string = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}

/**
 * Array of valid game status values.
 */
export const gameStatus: Status[] = [
  "Playing",
  "Backlog",
  "Wishlist",
  "Beat",
  "Paused",
];

/**
 * Returns true if given game status is valid.
 * @param status string to validate.
 * @returns boolean.
 */
export const isValidGameStatus = (status: string): status is Status => {
  return gameStatus.includes(status as Status);
};

/**
 * Object of valid game field key/value pairs.
 */
export const gameFields = {
  Title: "title",
  Platform: "platform",
  Developer: "developer",
  "Release Date": "releaseDate",
  Score: "score",
  Medium: "medium",
};

/**
 * Returns true if given key is a valid Game field.
 * @param key to validate.
 * @returns boolean.
 */
export const isValidGameField = (key: string): key is GameField => {
  return Object.values(gameFields).includes(key as GameField);
};
