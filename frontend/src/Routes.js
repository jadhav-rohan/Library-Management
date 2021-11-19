import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import Books from "./components/Books/Books";

// import Nav from "./components/Nav/Nav";
import Return from "./components/Return/Return";
import Search from "./components/search/search";
import Issue from "./components/Issue/Issue";
import AddBooks from "./components/AddBook/Addbook";
import Signup from "./components/AddUser/AddUser";
import Admin from "./components/Admin/Admin";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/books" exact component={Books} />
        <Route path="/" exact component={Books} />
        <Route path="/return" exact component={Return} />
        <Route path="/search" exact component={Search} />
        <Route path="/borrow" exact component={Issue} />
        <Route path="/addbook" exact component={AddBooks} />
        <Route path="/adduser" exact component={Signup} />
        <Route path="/login" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
