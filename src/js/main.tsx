import App from "./components/App.js";
import Games from "./games.ts";
import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container);
const AppElem: React.ReactElement = <App games={Games} />;
root.render(AppElem);
