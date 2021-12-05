import React, { useEffect, useState } from "react";
import Axios from "axios";
import Nav from "../Nav/Nav";
import "./Admin.css";
import { Redirect } from "react-router";

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  //   const [id, setIdReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3002/api/signin", {
      username: usernameReg,
      password: passwordReg,
      //   id: id,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3002/api/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/api/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <Nav
        title={"Register & Login Here!"}
        description={
          "Register if you are new user and Login if you are existing user!"
        }
      />
      <div className="registration">
        <h1>Registration</h1>
        <form className="form">
          {/* <label>Admin Id</label>
          <input
            type="text"
            onChange={(e) => {
              setIdReg(e.target.value);
            }}
          /> */}
          <label>Username</label>

          <input
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </form>
        <button id="reg-button" onClick={register}>
          {" "}
          Register{" "}
        </button>
      </div>

      <div className="login-div">
        <div className="container">
          <h1>Login</h1>
          <form className="form">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
          <button id="login-button" onClick={login}>
            {" "}
            Login{" "}
          </button>
          {loginStatus && <Redirect to="/addbook" />}
          {/* <div>{loginStatus}</div> */}
        </div>
      </div>
    </div>
  );
}
