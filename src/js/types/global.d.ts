declare global {
  type Platform = "Nintendo Switch" | "Steam";
  type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
  type Status =
    | "Beat"
    | "Playing"
    | "Paused"
    | "Backlog"
    | "Wishlist"
    | "Paused";
  type Medium = "Physical | Digital" | "Game Key Card";
  type FieldName =
    | "Title"
    | "Platform"
    | "Developer"
    | "Release Date"
    | "Medium"
    | "Score";
  interface Game {
    title: string;
    platform: Platform;
    developer: string;
    releaseDate: Date;
    status: Status;
    score: OneToTen;
    medium: Medium;
  }
}

export {};
