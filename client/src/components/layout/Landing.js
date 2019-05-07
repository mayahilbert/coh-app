import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "./logo.svg";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container center-align valign">
        <div className="row">
          <div className="col s12 center-align">
            <h1 className="flow-text grey-text text-darken-1">
            <br /><br />
              <img src={logo} height="200" alt="COH" />
              <br /><br />
              It&#8217;s easier to live with COH.

            </h1>
            <div className="yellow-highlight tag-line">
            <br />
            <p className="white-text "> A COLIVING MANAGEMENT TOOL
<br /></p></div>
            <br />
            <Link to="/register"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large coh-yellow hoverable white-text"
            >
              Register
            </Link>
            <Link to="/login"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large white hoverable grey-text text-darken-1"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
