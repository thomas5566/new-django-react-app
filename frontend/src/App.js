import React, { Component } from "react";
import Root from "./Root";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import requireAuth from "./utils/RequireAuth";

import axios from "axios";
if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

class App extends Component {
  render() {
    return (
      <div>
        <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
            <Route exact path="/" component={Home} />
            <Root path="*">Ups</Root>
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;