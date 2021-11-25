import React, { useEffect } from "react";
import Axios from "axios";
import Nav from "../Nav/Nav";

export default function Logout() {
  //   const [signout, setSignout] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3002/api/logout").then((response) => {
      //   console.log(response);
    });
  });

  return (
    <div>
      <Nav />
      <h1> Succesfully Logged Out!</h1>
    </div>
  );
}
