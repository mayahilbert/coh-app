import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";



import logo from "./logo.svg";

class Menu extends Component {


  render() {

    const { user } = this.props.auth;


    return (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
          <img src={logo} height="60" alt="COH" />
          </Link>
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
                  <Link to="/admin/stats" className="nav-link">
                    Stats
                  </Link>
                </li>


{/*                <li className="navbar-item dropdown">
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
                    <Link to="/" className="dropdown-item">
                      User Settings
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Group Settings
                    </Link>
                  </div>
                </li>*/}

<span>
                <li className="navbar-item">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>
                </span>
              </ul>
              <span className="navbar-text white-text">
              <p>
                Logged into <strong>{user.name}</strong>
                </p>
              </span>
          </nav>
          <br />
          </div>
    );
  }
}

Menu.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Menu);
