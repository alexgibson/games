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
