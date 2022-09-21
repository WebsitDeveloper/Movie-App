import React from "react";
import { Tab, ListGroup } from "react-bootstrap";
import { useActiveGenreContext } from "../context/activeGenreContext";
import GenresDataJSON from "../data/Genre.json";
import AddNewModal from "../add/AddNewModal";

function Genres() {
  const [activeGenre, handleActiveGenreChange] = useActiveGenreContext();

  const handleShowAllMovies = () => {
    handleActiveGenreChange({
      name: "All Movies",
      id: "0",
    });

    return;
  };

  const handleSelectGenre = (genre) => {
    handleActiveGenreChange({
      name: genre.name,
      id: genre._id,
    });

    return;
  };
  return (
    <div>
      <AddNewModal />
      <Tab.Container
        id="genreListGroup"
        style={{ width: "1000px" }}
        defaultActiveKey={activeGenre.name}
      >
        <ListGroup as="ul">
          <ListGroup.Item
            as="li"
            action
            href="All Movies"
            onClick={handleShowAllMovies}
            style={{ cursor: "pointer" }}
          >
            All Movies
          </ListGroup.Item>
          {GenresDataJSON.map((genre) => {
            return (
              <ListGroup.Item
                as="li"
                key={genre._id}
                onClick={() => {
                  handleSelectGenre(genre);
                }}
                action
                href={genre.name}
                style={{ cursor: "pointer" }}
              >
                {genre.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Tab.Container>
    </div>
  );
}

export default Genres;
