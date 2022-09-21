import React from "react";
import { Pagination } from "react-bootstrap";
import MoviesContainer from "./MoviesContainer";

function Movies() {
  return (
    <>
      <MoviesContainer />
      <Pagination />
    </>
  );
}

export default Movies;
