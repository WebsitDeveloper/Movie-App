import { Button } from "react-bootstrap";

import React from "react";

function MoviesItem({ movie, deleteMovie }) {
  return (
    <>
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>

        <td>{movie.dailyRentalRate}</td>
        <td>
          <div className="btn-del">
            <Button className="lil" onClick={() => deleteMovie(movie._id)}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default MoviesItem;
