import { sortByKey, filterByKey, formatShortDate } from "../src/js/utils.ts";
import { data } from "./data.ts";

describe("sortByKey()", () => {
  test("sort an array of objects by key", () => {
    const resultTitleAsc = sortByKey(data, "title");
    expect(resultTitleAsc[0].title).toEqual("Title A");
    expect(resultTitleAsc[1].title).toEqual("Title B");
    expect(resultTitleAsc[2].title).toEqual("Title C");

    const resultTitleDesc = sortByKey(data, "title", false);
    expect(resultTitleDesc[0].title).toEqual("Title C");
    expect(resultTitleDesc[1].title).toEqual("Title B");
    expect(resultTitleDesc[2].title).toEqual("Title A");

    const resultScoreAsc = sortByKey(data, "score");
    expect(resultScoreAsc[0].score).toEqual(9);
    expect(resultScoreAsc[1].score).toEqual(10);

    const resultScoreDesc = sortByKey(data, "score", false);
    expect(resultScoreDesc[0].score).toEqual(10);
    expect(resultScoreDesc[1].score).toEqual(9);
  });
});

describe("filterByKey()", () => {
  test("filter an array of objects by key and value", () => {
    const resultTitle = filterByKey(data, "title", "Title A");
    expect(resultTitle.length).toEqual(1);
    expect(resultTitle[0].title).toEqual("Title A");

    const resultDeveloper = filterByKey(data, "developer", "Nintendo");
    expect(resultDeveloper.length).toEqual(2);
    expect(resultDeveloper[0].developer).toEqual("Nintendo");
    expect(resultDeveloper[1].developer).toEqual("Nintendo");

    const resultScore = filterByKey(data, "score", 10);
    expect(resultScore.length).toEqual(1);
    expect(resultScore[0].score).toEqual(10);
  });
});

describe("formatShortDate()", () => {
  test("return a short date string", () => {
    const date = new Date("03 March 2017");
    expect(formatShortDate(date)).toEqual("03/03/2017");
    expect(formatShortDate(date, "de")).toEqual("03.03.2017");
  });
});
