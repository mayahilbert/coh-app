import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./css/App.css";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";

import PrivateRoute from "./components/private-route/PrivateRoute";

import TallyList from "./components/TallyList";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";
import EditTally from "./components/EditTally";
import Stats from "./components/Stats";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <Switch>
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/task-list" component={TaskList} />
        <PrivateRoute path="/tally-list" component={TallyList} />
        <PrivateRoute path="/edit" component={EditTask} />
        <PrivateRoute path="/edit" component={EditTally} />
        <PrivateRoute path="/stats" component={Stats} />

        </Switch>

      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
