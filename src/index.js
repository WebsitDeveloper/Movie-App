import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { MoviesDataProvider } from "./moviescomponents/context/MoviesContext";
import { ActiveGenreProvider } from "./moviescomponents/context/activeGenreContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ActiveGenreProvider>
      <MoviesDataProvider>
        <App />
      </MoviesDataProvider>
    </ActiveGenreProvider>
  </React.StrictMode>
);
