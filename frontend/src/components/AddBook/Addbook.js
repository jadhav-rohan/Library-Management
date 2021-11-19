import React, { useState } from "react";
import "./Addbook.css";
import Axios from "axios";
import Nav from "../Nav/Nav";

function AddBooks() {
  const [bookName, setbookName] = useState("");
  const [bookId, setbookId] = useState("");
  const [bookAuthor, setbookAuthor] = useState("");
  const [bookCount, setbookCount] = useState("");
  const [semester, setSemester] = useState("");

  const submit = () => {
    Axios.post("http://localhost:3002/api/insert", {
      bookId: bookId,
      bookName: bookName,
      bookAuthor: bookAuthor,
      semester: semester,
      bookCount: bookCount,
    }).then(() => {
      return alert("Successfully Inserted!");
    });
  };
  return (
    <div>
      <Nav
        title={"Add Books Here"}
        description={"You can Add books to Library Here!"}
      />
      <div className="form">
        <label>Name</label>
        <input
          type="text"
          name="bookName"
          onChange={(e) => {
            setbookName(e.target.value);
          }}
        ></input>
        <label>Book Id</label>
        <input
          type="text"
          name="bookId"
          onChange={(e) => {
            setbookId(e.target.value);
          }}
        ></input>
        <label>Author's Name</label>
        <input
          type="text"
          name="author"
          onChange={(e) => {
            setbookAuthor(e.target.value);
          }}
        ></input>
        <label>Semester</label>
        <input
          type="text"
          name="count"
          onChange={(e) => {
            setSemester(e.target.value);
          }}
        ></input>
        <label>Book Count</label>
        <input
          type="text"
          name="count"
          onChange={(e) => {
            setbookCount(e.target.value);
          }}
        ></input>
        <button className="add-btn" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddBooks;
