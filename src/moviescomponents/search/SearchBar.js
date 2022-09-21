import React from "react";
import { Button, InputGroup, Form } from "react-bootstrap";

function SearchBar({ searchInput, handleSearchInputChange, handleClearInput }) {
  return (
    <InputGroup>
      <Form.Control
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search movie by title"
        aria-label="Search Movie"
        className="mb-3"
      />
      {searchInput ? (
        <Button
          variant="outline-secondary"
          id="btnClear"
          onClick={handleClearInput}
        >
          clear
        </Button>
      ) : null}
    </InputGroup>
  );
}

export default SearchBar;
