import gameData from "./data/games.json";

const Games: Game[] = gameData.map((game) => ({
  ...game,
  platform: game.platform as Platform,
  releaseDate: new Date(game.releaseDate),
  status: game.status as Status,
  score: game.score as OneToTen,
  medium: game.medium as Medium,
}));

export default Games;
