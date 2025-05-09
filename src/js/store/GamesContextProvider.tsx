import React from "react";
import { useState } from "react";
import Games from "../games.ts";
import {
  sortByKey,
  filterByKey,
  isValidGameStatus,
  isValidGameField,
  getGameFieldKey,
} from "../utils.ts";

interface GamesContextType {
  games: Game[];
  gamesInLibrary: number;
  activeStatus: Status;
  searchQuery: string;
  searchField: FieldName;
  sortField: FieldName;
  sortAscending: boolean;
  sortGames: (value: FieldName) => void;
  updateSearchQuery: (value: string) => void;
  updateSearchField: (value: string) => void;
  updateStatus: (value: string) => void;
}

export const GamesContext = React.createContext<GamesContextType>({
  games: [],
  gamesInLibrary: 0,
  activeStatus: "Playing",
  searchQuery: "",
  searchField: "Title",
  sortField: "Title",
  sortAscending: true,
  sortGames: () => {},
  updateSearchQuery: () => {},
  updateSearchField: () => {},
  updateStatus: () => {},
});

type GamesContextProviderProps = {
  children: React.ReactNode;
  gamesOverride?: Game[];
};

export default function GamesContextProvider({
  children,
  gamesOverride,
}: GamesContextProviderProps) {
  const [activeStatus, setActiveStatus] = useState<Status>("Playing");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchField, setSearchField] = useState<FieldName>("Title");
  const [sortField, setSortField] = useState<FieldName>("Title");
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const allGames = gamesOverride ?? Games;

  const searchKey = getGameFieldKey(searchField);
  const sortKey = getGameFieldKey(sortField);

  // all games with wishlist status.
  const wishlistGames: Game[] = filterByKey(allGames, "status", "Wishlist");
  const gamesInLibrary = allGames.length - wishlistGames.length;

  // all games for currently selected status.
  const statusGames: Game[] = filterByKey(allGames, "status", activeStatus);

  // all games for currently selected status, sorted by selected field.
  const sortedGames: Game[] = sortByKey(statusGames, sortKey, sortAscending);

  // all games for current status, sorted, and then filtered by search value.
  const games: Game[] = filterByKey(sortedGames, searchKey, searchQuery);

  const updateStatus = (status: string) => {
    if (isValidGameStatus(status)) {
      setActiveStatus(status);
    }
  };

  const updateSearchField = (value: string) => {
    if (isValidGameField(value)) {
      setSearchField(value);
    }
  };

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const sortGames = (value: FieldName) => {
    if (isValidGameField(value)) {
      setSortField(value);
      setSortAscending((prevValue) => !prevValue);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        gamesInLibrary,
        activeStatus,
        searchQuery,
        searchField,
        sortField,
        sortAscending,
        sortGames,
        updateSearchQuery,
        updateSearchField,
        updateStatus,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
