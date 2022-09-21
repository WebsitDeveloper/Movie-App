import React from "react";
import { v4 as uuid } from "uuid";
import { useMoviesDataContext } from "../context/MoviesContext";
import GenreData from "../data/Genre.json";

import {
  ButtonGroup,
  Button,
  Modal,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

const AddNewModal = () => {
  const [{ moviesData }, { handleMoviesDataChange }] = useMoviesDataContext();
  const [addNewMovieModal, setAddNewMovieModal] = React.useState(false);
  const [genreDetails, setGenreDetails] = React.useState();
  const [title, setTitle] = React.useState("");
  const [movieGenre, setMovieGenre] = React.useState("");
  const [stock, setStock] = React.useState();
  const [rate, setRate] = React.useState();

  //////////// Form ////////////
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleGenreChange = (event) => {
    if (
      event.target.value === "selectGenre" ||
      event.target.value === "addNewGenre"
    ) {
      console.log("Please Select Genre");
      setMovieGenre("");
      return;
    }

    setMovieGenre(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  React.useEffect(() => {
    const matchedGenre = GenreData.filter((obj) => {
      return obj.name === movieGenre;
    });

    if (matchedGenre) {
      setGenreDetails(matchedGenre);
      return;
    }

    console.log("no data");
  }, [stock]);

  const handleAddNew = (event) => {
    // validating for empty inputs
    if (
      title === "" ||
      movieGenre === "" ||
      stock === undefined ||
      stock === "" ||
      rate === undefined ||
      rate === ""
    ) {
      console.log("Details are missing, please enter again.");
      event.preventDefault();
      return;
    }

    const unique_id = uuid().slice(0, 8); // generating unique id for new movie

    handleMoviesDataChange([
      {
        _id: unique_id,
        title: title,
        genre: {
          _id: genreDetails[0]._id,
          name: genreDetails[0].name,
        },
        numberInStock: stock,
        dailyRentalRate: rate,
      },
      ...moviesData,
    ]);

    setAddNewMovieModal(false);

    event.preventDefault();
  };
  //////////// Button ////////////
  const handleBtnAddNew = () => setAddNewMovieModal(true);

  const handleBtnClose = () => setAddNewMovieModal(false);

  return (
    <>
      <ButtonGroup className="d-flex mb-5">
        <Button onClick={handleBtnAddNew}>Add New Movie</Button>
      </ButtonGroup>

      <Modal show={addNewMovieModal} onHide={handleBtnClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new movie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Enter the details of the movie you want to add</p>

          <Form onSubmit={handleAddNew}>
            <Row className="mt-4">
              <Form.Group as={Col}>
                <FloatingLabel label="Title">
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="title"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" as={Col}>
                <FloatingLabel label="Genre">
                  <Form.Select onChange={handleGenreChange}>
                    <option id="0" value="selectGenre">
                      Select Genre
                    </option>
                    {GenreData.map((genre, index) => {
                      return (
                        <option
                          key={genre._id}
                          value={genre.name}
                          id={index + 1}
                        >
                          {genre.name}
                        </option>
                      );
                    })}
                    <option value="addNewGenre"></option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <FloatingLabel label="Stock">
                  <Form.Control
                    type="number"
                    value={stock || ""}
                    onChange={handleStockChange}
                    placeholder="stock"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" as={Col}>
                <FloatingLabel label="Rate">
                  <Form.Control
                    type="number"
                    value={rate || ""}
                    onChange={handleRateChange}
                    placeholder="rate"
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Button
              type="submit"
              className="d-grid mx-auto"
              style={{ padding: "10px 50px 10px 50px" }}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleBtnClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewModal;
