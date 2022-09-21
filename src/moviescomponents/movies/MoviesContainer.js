import React from "react";
import { Table } from "react-bootstrap";
import { useActiveGenreContext } from "../context/activeGenreContext";
import { useMoviesDataContext } from "../context/MoviesContext";
import MoviesItem from "./MoviesItem";
import SearchBar from "../search/SearchBar";
import Pagination from "../pagination/Pagination";
import DeleteModel from "../modal/DeleteModel";

function MoviesContainer() {
  const [{ moviesData }, { handleMoviesDataChange }] = useMoviesDataContext();

  const [activeGenre] = useActiveGenreContext();
  //delete ki useState//
  const [directDeleteMovie, setDirectDeleteMovie] = React.useState(false);

  const [deleteModel, setDeleteModel] = React.useState({
    isVisible: false,
    targetId: null,
  });
  //pagination ki useState///
  const [currentPage, setCurrentPage] = React.useState(1);
  const [moviesPerPage] = React.useState(4);
  const [searchInput, setSearchInput] = React.useState("");

  // ya wala genre k laiy ///
  const filterMovies = moviesData.filter((movie) => {
    if (activeGenre.id === "0") {
      return movie.genre._id !== activeGenre.id;
    }
    return movie.genre._id === activeGenre.id;
  });
  //ya wala pagination k liay///
  const indexOfFirstMovie = currentPage * moviesPerPage - moviesPerPage;
  const indexOfLastMovie = currentPage * moviesPerPage - 1;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalMovies = filterMovies.length;

  const searchFilteredMovies = filterMovies.filter((movie) =>
    movie.title.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const moviesToShow = searchFilteredMovies.filter((_movie, index) => {
    if (index >= indexOfFirstMovie && index <= indexOfLastMovie) {
      return true;
    }

    return false;
  });

  ////// for searching///////

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  ///Delete Model/////

  const deleteMovie = (id) =>
    handleMoviesDataChange(moviesData.filter((movie) => movie._id !== id));

  const handleDeleteMovie = (id) => {
    if (!directDeleteMovie) {
      setDeleteModel({
        isVisible: true,
        targetId: id,
      });
      return;
    }
    deleteMovie(id);
  };

  const handleBtnConfirmDelete = () => {
    deleteMovie(deleteMovie.targetid);
    setDeleteModel({
      isVisible: false,
      targetId: null,
    });
    return;
  };

  const handleDirectDeleteMovieIsChecked = (event) => {
    if (event.target.checked) {
      setDirectDeleteMovie(true);
    }

    return;
  };
  const handleBtnCloseDeleteModal = () => {
    setDeleteModel({
      isVisible: false,
      targetId: null,
    });
    setDirectDeleteMovie(false);

    return;
  };

  return (
    <>
      <h4>Showing {moviesData.length} movies in the Database</h4>
      <SearchBar
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
        handleClearInput={handleClearInput}
      />
      <Table className="t-2" bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>genre</th>
            <th>stock</th>
            <th>rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {moviesToShow.map((movie) => {
            return (
              <MoviesItem
                movie={movie}
                key={movie._id}
                deleteMovie={handleDeleteMovie}
              />
            );
          })}
        </tbody>
      </Table>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={totalMovies}
        paginate={paginate}
        currentPage={currentPage}
      />
      <DeleteModel
        modalTitle="Delete Movie"
        modalDescription="Are you sure you want todelete this movie?"
        showModal={deleteModel}
        handleBtnClose={handleBtnCloseDeleteModal}
        handleBtnConfirm={handleBtnConfirmDelete}
        handleRememberIsChecked={handleDirectDeleteMovieIsChecked}
      />
    </>
  );
}
export default MoviesContainer;
