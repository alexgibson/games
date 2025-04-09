import { sortByKey, filterByKey, formatShortDate } from "../src/js/utils.ts";
import Games from "./games.ts";

describe("sortByKey()", () => {
  test("sort an array of objects by key", () => {
    const resultTitleAsc = sortByKey(Games, "title");
    expect(resultTitleAsc[0].title).toEqual("Title A");
    expect(resultTitleAsc[1].title).toEqual("Title B");
    expect(resultTitleAsc[2].title).toEqual("Title C");
    expect(resultTitleAsc[3].title).toEqual("Title D");
    expect(resultTitleAsc[4].title).toEqual("Title E");

    const resultTitleDesc = sortByKey(Games, "title", false);
    expect(resultTitleDesc[0].title).toEqual("Title E");
    expect(resultTitleDesc[1].title).toEqual("Title D");
    expect(resultTitleDesc[2].title).toEqual("Title C");
    expect(resultTitleDesc[3].title).toEqual("Title B");
    expect(resultTitleDesc[4].title).toEqual("Title A");

    const resultScoreAsc = sortByKey(Games, "score");
    expect(resultScoreAsc[0].score).toEqual(6);
    expect(resultScoreAsc[1].score).toEqual(7);
    expect(resultScoreAsc[2].score).toEqual(8);
    expect(resultScoreAsc[3].score).toEqual(9);
    expect(resultScoreAsc[4].score).toEqual(10);

    const resultScoreDesc = sortByKey(Games, "score", false);
    expect(resultScoreDesc[0].score).toEqual(10);
    expect(resultScoreDesc[1].score).toEqual(9);
    expect(resultScoreDesc[2].score).toEqual(8);
    expect(resultScoreDesc[3].score).toEqual(7);
    expect(resultScoreDesc[4].score).toEqual(6);
  });
});

describe("filterByKey()", () => {
  test("filter an array of objects by key and value", () => {
    const resultTitle = filterByKey(Games, "title", "Title A");
    expect(resultTitle.length).toEqual(1);
    expect(resultTitle[0].title).toEqual("Title A");

    const resultDeveloper = filterByKey(Games, "developer", "Developer A");
    expect(resultDeveloper.length).toEqual(2);
    expect(resultDeveloper[0].developer).toEqual("Developer A");
    expect(resultDeveloper[1].developer).toEqual("Developer A");

    const resultScore = filterByKey(Games, "score", 10);
    expect(resultScore.length).toEqual(1);
    expect(resultScore[0].score).toEqual(10);
  });
});

describe("formatShortDate()", () => {
  test("return a short date string", () => {
    const date = new Date("March 3 2017");
    expect(formatShortDate(date)).toEqual("03 March 2017");
    expect(formatShortDate(date, "de")).toEqual("03. März 2017");
  });
});
