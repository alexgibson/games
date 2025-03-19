import { Game } from "./types.ts";
import gameData from "./data/games.json";
import { Platform, Status, OneToTen } from "./types.ts";

const Games: Game[] = gameData.map((game) => ({
  ...game,
  platform: game.platform as Platform,
  releaseDate: new Date(game.releaseDate),
  status: game.status as Status,
  score: game.score as OneToTen,
}));

export default Games;
