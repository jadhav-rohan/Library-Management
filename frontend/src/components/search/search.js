import React from "react";
import Nav from "../Nav/Nav";
import "./search.css";

class Search extends React.Component {
  state = {
    header: <thead></thead>,
    books: [],
    name: "",
  };

  fetchData = () => {
    var id = document.getElementById("id").value;
    this.setState({
      header: (
        <thead id="header">
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Issue Date</th>
            <th scope="col">Return Deadline</th>
          </tr>
        </thead>
      ),
      books: [],
    });

    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((student) => {
        if (student.length > 0) {
          this.setState({
            ...this.state,
            name: `Following Students Issued This Book`,
          });
          student.forEach((el) =>
            this.setState({
              books: [
                ...this.state.books,
                <tr key={el.id}>
                  <td>{el.name.toUpperCase()}</td>
                  <td>{el.date}</td>
                  <td>{el.deadline}</td>
                </tr>,
              ],
            })
          );
        } else {
          this.setState({ header: [] });
          this.setState({
            ...this.state,
            name: "No One Have Issued This Book",
          });
        }
      });
  };

  returnIt = (el) => {
    fetch("/api/return", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...el,
        sid: parseInt(document.getElementById("sid").value),
      }),
    });
  };

  render() {
    return (
      <div id="search" className="text-center">
        <Nav
          title="Search for the Book Here!"
          description="Enter book Id you want to Search for!"
        />
        <div className="search-form">
          <input
            className="form-control sel"
            type="number"
            placeholder="Enter Book ID"
            id="id"
            min="1"
          ></input>
          <button className="btn btn-dark" onClick={this.fetchData}>
            Submit
          </button>
        </div>
        <br />
        {this.state.name}
        <table id="sResults" className="table table-hover">
          {this.state.header}
          <tbody>{this.state.books}</tbody>
        </table>
      </div>
    );
  }
}

export default Search;
