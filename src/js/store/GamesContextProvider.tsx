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
  isModalOpen: false,
  searchField: "Title" as FieldName,
  searchQuery: "",
  sortAscending: true,
  sortField: "Title" as FieldName,
};

type GamesAction =
  | { type: "SORT_TABLE"; payload: { field: FieldName } }
  | { type: "UPDATE_ACTIVE_TAB_BUTTON"; payload: Status }
  | { type: "UPDATE_MODAL_VISIBILITY"; payload: boolean }
  | { type: "UPDATE_SEARCH_FIELD_OPTION"; payload: FieldName }
  | { type: "UPDATE_SEARCH_QUERY"; payload: string };

type GamesState = {
  activeTabButton: Status;
  games: Game[];
  isModalOpen: boolean;
  searchField: FieldName;
  searchQuery: string;
  sortAscending: boolean;
  sortField: FieldName;
};

interface GamesContextType {
  activeTabButton: Status;
  games: Game[];
  gamesInLibrary: number;
  handleSortGames: (value: FieldName) => void;
  handleUpdateActiveTabButton: (value: string) => void;
  handleUpdateModalVisibility: (value: boolean) => void;
  handleUpdateSearchFieldOption: (value: string) => void;
  handleUpdateSearchQuery: (value: string) => void;
  isModalOpen: boolean;
  searchField: FieldName;
  searchQuery: string;
  sortAscending: boolean;
  sortField: FieldName;
}

export const GamesContext = React.createContext<GamesContextType>({
  ...INITIAL_STATE,
  games: [],
  gamesInLibrary: 0,
  handleSortGames: () => {},
  handleUpdateActiveTabButton: () => {},
  handleUpdateModalVisibility: () => {},
  handleUpdateSearchFieldOption: () => {},
  handleUpdateSearchQuery: () => {},
  isModalOpen: false,
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
      case "UPDATE_MODAL_VISIBILITY": {
        return {
          ...state,
          isModalOpen: action.payload,
        };
      }
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

  const handleUpdateModalVisibility = (value: boolean) => {
    dispatchTableStateAction({
      type: "UPDATE_MODAL_VISIBILITY",
      payload: value,
    });
  };

  return (
    <GamesContext.Provider
      value={{
        ...tableState,
        gamesInLibrary,
        handleSortGames,
        handleUpdateActiveTabButton,
        handleUpdateModalVisibility,
        handleUpdateSearchFieldOption,
        handleUpdateSearchQuery,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
