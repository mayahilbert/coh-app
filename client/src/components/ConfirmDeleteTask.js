import React, { Component } from "react";
import { Link } from "react-router-dom";


class ConfirmDeleteTask extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container center-align vertical-align margin-top">
        <div className="row">
          <div className="col s12 center-align">
            <h1 className="flow-text grey-text text-darken-1">
              Task successfully deleted.
            </h1>
            <br />
            <Link to="/task-list" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              tasks
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmDeleteTask;
