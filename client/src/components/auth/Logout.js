import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Logout extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {

return (
      <div style={{ height: "75vh" }} className="container center-align margin-top">
        <div className="row">
          <div className="col s12 center-align">
            <h4 className="flow-text grey-text text-darken-1">
            Are you sure you want to log out?
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large hoverable coh-yellow white-text"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);
