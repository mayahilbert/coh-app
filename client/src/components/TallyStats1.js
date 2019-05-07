import React, { Component } from "react";
import TallyForm from "./TallyForm";
import TallyCount from "./TallyCount";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import moment from "moment";

class TallyStats1 extends Component {
  constructor(props) {
    super(props);
    this.state = { tallies: [], talliesUser: [], talliesAdmin: [], talliesCount: [] };
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios
      .get("/tally-list/delete/" + this.props.tally._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const { user } = this.props.auth;
    axios
      .get("/tally-list/")
      .then(response => {
        this.setState({ talliesAdmin: response.data });
      })
      .catch(function(error) {
        console.log(error);
      })


      axios
        .get("/tally-list/" + user.id.toString())
        .then(response => {
          this.setState({ tallies: response.data });
        })
        .catch(function(error) {
          console.log(error);
        })




    axios
      .get("/tally-list/count/" + user.id.toString())
      .then(response => {
        this.setState({ talliesCount: response.data });
      })
      .catch(function(error) {
        console.log(error);
      })


          if(user.name === "ADMIN"){
            console.log("This is ADMIN");
          }
  }


  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ margin: "6rem" }}>
        <div className="margin-top">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Owner ID</th>
                <th>Owner</th>
                <th>Tally ID</th>
                <th>Tally</th>
                <th>Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {this.state.tallies.reverse().map((tally, id) => (
               <tr key={tally._id}>
                <td>{tally.owner_id}</td>
                <td>{tally.owner_name}</td>
                <td>{tally._id}</td>
                  <td>{tally.tally_name}</td>
                  <td>{moment(tally.tally_time).format("YYYY-MM-DD hh:mm")}</td>
                  <td>
                    <Link
                      to={"/tally-list/edit/" + tally._id}
                      className="btn btn-large"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link to="/confirm-delete-tally">
                      <button
                        onClick={() => {
                          this.delete(tally);
                        }}
                        className="btn btn-large coh-yellow white-text btn-delete"
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TallyStats1.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(TallyStats1);
