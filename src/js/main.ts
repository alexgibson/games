import data from "./data.ts";
import { sortByKey, filterByKey } from "./utils.ts";

const filteredData = filterByKey(data, "title", "Zelda");
const sortedData = sortByKey(filteredData, "title");

console.log(sortedData);
