import "./Nav.css";
import React from "react";
import "./Nav.css";
// import Axios from "axios";

const Nav = (props) => {
  return (
    <div>
      <div className="header">
        <ul className="headerlist">
          <a href="/">Home</a>
          <a href="/borrow">Issue Book</a>
          <a href="/return">Return</a>
          <a href="/search">Search</a>
          <a href="/addbook">Add Book</a>
          <a href="/login" className="login-btn">
            Login
          </a>
          {/* <a href="/borrow">BORROW</a> */}
          {/* <a href="/notifications">NOTIFICATIONS</a> */}
          {/* <a href="/addbooks">ADD BOOK</a> */}
          {/* <a className="loginbtn" href="/registration">
            LOGIN
          </a>
          <a className="logoutbtn" href="/logout">
            LOGOUT
          </a> */}
        </ul>
      </div>
      <h1>{props.title}</h1>
      <h3>{props.description}</h3>
    </div>
  );
};

export default Nav;
