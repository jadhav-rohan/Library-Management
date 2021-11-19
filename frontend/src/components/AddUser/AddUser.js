import React from "react";
import Axios from "axios";
import { useState } from "react";
import Nav from "../Nav/Nav";
import "./AddUser.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userId, setuserId] = useState("");

  const submit = () => {
    Axios.post("http://localhost:3002/api/adduser", {
      username: username,
      userId: userId,
    }).then((response) => {
      return alert("Succesfully Registered!");
    });
  };

  return (
    <div>
      <Nav title={"Register Here!"} description={"Enter your details Below"} />
      <div className="user-form">
        <div>
          <h1>Welcome</h1>

          <form className="form">
            <input
              type="text"
              placeholder="Enter Student Id"
              name="userId"
              onChange={(e) => {
                setuserId(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button /*type="submit"*/ id="login-button" onClick={submit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
