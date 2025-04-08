/**
 * Sorts a given array of objects by key.
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
 * @param array of objects to be sorted.
 * @param key to filter by.
 * @param value to filter by.
 * @returns filtered array of objects.
 */
export function filterByKey<T, K extends keyof T>(
  array: T[],
  key: K,
  value: string | number,
): T[] {
  if (!value) {
    return array;
  }

  return array.filter((item) => {
    const val = value.toString().toLocaleLowerCase();
    if (String(item[key]).toLowerCase().includes(val)) {
      return item;
    }
  });
}

/**
 * Returns a shortened date string.
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
 * Array of valid status keys.
 */
export const validStatusKeys: Status[] = [
  "Playing",
  "Backlog",
  "Wishlist",
  "Beat",
  "Paused",
];

/**
 * Object of valid game keys/values for search fields.
 */
export const validGameKeys = {
  Title: "title",
  Platform: "platform",
  Developer: "developer",
  "Release Date": "releaseDate",
  Score: "score",
  Medium: "medium",
};

/**
 * Returns true if given key is a valid Game object key.
 * @param key to validate.
 * @returns boolean.
 */
export const isGameKey = (key: string): key is GameKey => {
  return Object.values(validGameKeys).includes(key as GameKey);
};
