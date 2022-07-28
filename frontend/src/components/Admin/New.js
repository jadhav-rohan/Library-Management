import React, { useEffect, useState } from "react";
// import Axios from "axios";
import Nav from "../Nav/Nav";
import "./Admin.css";
import { Redirect } from "react-router";

export default function New() {
  return (
    <div className="App">
      <Nav title={"Admin Dashboard"} description={"Welcome Admin!"} />
      <div className="new">
        <a className="newa" href="/adduser">
          AddUser
        </a>
        <a className="newa" href="/addbook">
          AddBook
        </a>
      </div>
    </div>
  );
}
