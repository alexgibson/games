import App from "./App.js";
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GamesContextProvider from "./store/GamesContextProvider";

const container = document.getElementById("app");
const root = createRoot(container);
const AppElem: React.ReactElement = <App />;

root.render(
  <StrictMode>
    <GamesContextProvider>{AppElem}</GamesContextProvider>
  </StrictMode>,
);
