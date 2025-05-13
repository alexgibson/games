import React from "react";
import { useReducer } from "react";
import Games from "../games.ts";
import {
  sortByKey,
  filterByKey,
  isValidGameStatus,
  isValidGameField,
  getGameFieldKey,
} from "../utils.ts";

// Initial state for when the app loads.
const INITIAL_STATE = {
  activeTabButton: "Playing" as Status,
  searchQuery: "",
  searchField: "Title" as FieldName,
  sortField: "Title" as FieldName,
  sortAscending: true,
};

type GamesAction =
  | { type: "UPDATE_ACTIVE_TAB_BUTTON"; payload: Status }
  | { type: "UPDATE_SEARCH_FIELD_OPTION"; payload: FieldName }
  | { type: "UPDATE_SEARCH_QUERY"; payload: string }
  | { type: "SORT_TABLE"; payload: { field: FieldName } };

type GamesState = {
  games: Game[];
  activeTabButton: Status;
  searchQuery: string;
  searchField: FieldName;
  sortField: FieldName;
  sortAscending: boolean;
};

interface GamesContextType {
  games: Game[];
  gamesInLibrary: number;
  activeTabButton: Status;
  searchQuery: string;
  searchField: FieldName;
  sortField: FieldName;
  sortAscending: boolean;
  handleSortGames: (value: FieldName) => void;
  handleUpdateSearchQuery: (value: string) => void;
  handleUpdateSearchFieldOption: (value: string) => void;
  handleUpdateActiveTabButton: (value: string) => void;
}

export const GamesContext = React.createContext<GamesContextType>({
  games: [],
  gamesInLibrary: 0,
  ...INITIAL_STATE,
  handleSortGames: () => {},
  handleUpdateSearchQuery: () => {},
  handleUpdateSearchFieldOption: () => {},
  handleUpdateActiveTabButton: () => {},
});

type GamesContextProviderProps = {
  children: React.ReactNode;
  initialGames?: Game[];
};

export default function GamesContextProvider({
  children,
  initialGames = Games,
}: GamesContextProviderProps) {
  const ALL_GAMES = initialGames;
  const wishlistGames: Game[] = filterByKey(ALL_GAMES, "status", "Wishlist");
  const gamesInLibrary = ALL_GAMES.length - wishlistGames.length;

  /**
   * Returns an array of Games[] derived from current state.
   * @param state object
   * @returns games array.
   */
  function deriveGamesFromState(state: Omit<GamesState, "games">) {
    const searchKey = getGameFieldKey(state.searchField);
    const sortKey = getGameFieldKey(state.sortField);
    const statusGames = filterByKey(ALL_GAMES, "status", state.activeTabButton);
    const sortedGames = sortByKey(statusGames, sortKey, state.sortAscending);
    return filterByKey(sortedGames, searchKey, state.searchQuery);
  }

  function handleTableStateAction(
    state: GamesState,
    action: GamesAction,
  ): GamesState {
    switch (action.type) {
      // Update <table> based on the active menu button.
      case "UPDATE_ACTIVE_TAB_BUTTON":
        return {
          ...state,
          activeTabButton: action.payload,
          games: deriveGamesFromState({
            ...state,
            activeTabButton: action.payload,
          }),
        };
      // Update <table> column for search query to apply to.
      case "UPDATE_SEARCH_FIELD_OPTION":
        return {
          ...state,
          searchField: action.payload,
          games: deriveGamesFromState({
            ...state,
            searchField: action.payload,
          }),
        };
      // Update <table> based on search input query string.
      case "UPDATE_SEARCH_QUERY":
        return {
          ...state,
          searchQuery: action.payload,
          games: deriveGamesFromState({
            ...state,
            searchQuery: action.payload,
          }),
        };
      // Sort <table> by selected column.
      // Ascending or descending derived from previous state.
      case "SORT_TABLE": {
        const isSameField = state.sortField === action.payload.field;
        const newAscending = isSameField ? !state.sortAscending : true;
        const newState = {
          ...state,
          sortField: action.payload.field,
          sortAscending: newAscending,
        };
        return {
          ...newState,
          games: deriveGamesFromState(newState),
        };
      }
      default:
        return state;
    }
  }

  const [tableState, dispatchTableStateAction] = useReducer(
    handleTableStateAction,
    {
      games: deriveGamesFromState({ ...INITIAL_STATE }),
      ...INITIAL_STATE,
    },
  );

  const handleUpdateActiveTabButton = (value: Status) => {
    if (isValidGameStatus(value)) {
      dispatchTableStateAction({
        type: "UPDATE_ACTIVE_TAB_BUTTON",
        payload: value,
      });
    }
  };

  const handleUpdateSearchFieldOption = (value: FieldName) => {
    if (isValidGameField(value)) {
      dispatchTableStateAction({
        type: "UPDATE_SEARCH_FIELD_OPTION",
        payload: value,
      });
    }
  };

  const handleUpdateSearchQuery = (value: string) => {
    dispatchTableStateAction({
      type: "UPDATE_SEARCH_QUERY",
      payload: value,
    });
  };

  const handleSortGames = (value: FieldName) => {
    if (isValidGameField(value)) {
      dispatchTableStateAction({
        type: "SORT_TABLE",
        payload: {
          field: value,
        },
      });
    }
  };

  return (
    <GamesContext.Provider
      value={{
        ...tableState,
        gamesInLibrary,
        handleSortGames,
        handleUpdateSearchQuery,
        handleUpdateSearchFieldOption,
        handleUpdateActiveTabButton,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
