import React from "react";
import Movies from "../src/moviescomponents/movies/Movies";

import Genres from "./moviescomponents/genre/Genres";

import "./App.css";

function App() {
  return (
    <>
      <div className="main-div">
        <div className="col-3">
          <Genres />
        </div>
        <div className="App">
          <Movies />
        </div>
      </div>
    </>
  );
}

export default App;
