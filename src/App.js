import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TallyList from "./components/tally-list.component";
import Tally from "./components/tally.component";
import TaskList from "./components/task-list.component";
import Task from "./components/task.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
          <img src={logo} width="200" height="100" alt="COH" />
          </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/task-list" className="nav-link">
                    Tasks
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/tally-list" className="nav-link">
                    Tallies
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Stats
                  </Link>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Settings
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">
                      User Settings
                    </a>
                    <a class="dropdown-item" href="#">
                      Group Settings
                    </a>
                  </div>
                </li>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/task-list" component={TaskList} />
          <Route path="/tally-list" component={TallyList} />
          <Route path="/task" component={Task} />
          <Route path="/tally" component={Tally} />
        </div>
      </Router>
    );
  }
}

export default App;
