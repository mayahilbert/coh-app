import React, { Component } from "react";
import { Link } from "react-router-dom";


import logo from "./logo.svg";

class Navbar extends Component {


  render() {

    return (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
          <img src={logo} height="60" alt="COH" />
          </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
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
                <li className="navbar-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Settings
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/tally-list" className="dropdown-item">
                      User Settings
                    </Link>
                    <Link to="/tally-list" className="dropdown-item">
                      Group Settings
                    </Link>
                  </div>
                </li>

                <li className="navbar-item">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          </div>
    );
  }
}


export default Navbar;
