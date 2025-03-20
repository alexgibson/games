export type Platform = "Nintendo Switch" | "Steam";
export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
export type Status =
  | "Beat"
  | "Playing"
  | "Paused"
  | "Backlog"
  | "Wishlist"
  | "Paused"
  | "Quit";
export type Medium = "Physical | Digital";

export interface Game {
  title: string;
  platform: Platform;
  developer: string;
  releaseDate: Date;
  status: Status;
  score: OneToTen;
  medium: Medium;
}
