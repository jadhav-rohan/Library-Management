import React, { useEffect, useState } from "react";
import Axios from "axios";
import Nav from "../Nav/Nav";
import "./Admin.css";
import { Redirect } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <Nav
        title="Welcome Admin"
        description="You can Add Books to the library here & Search for Book's Record   "
      ></Nav>
    </div>
  );
}
