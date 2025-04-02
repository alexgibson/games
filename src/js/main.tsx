import React from "react";
import App from "./components/App.js";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container);
const AppElem: React.ReactElement = <App />;
root.render(AppElem);
