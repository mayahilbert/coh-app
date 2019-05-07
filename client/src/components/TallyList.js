import React, { Component } from "react";
import TallyForm from "./TallyForm";
import TallyCount from "./TallyCount";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import moment from "moment";

class TallyList extends Component {
  constructor(props) {
    super(props);
    this.state = { tallies: [], talliesCount: [] };
    this.delete = this.delete.bind(this);
  }


  componentDidMount() {
    const { user } = this.props.auth;

    axios
      .get("/tally-list/" + user.id.toString())
      .then(response => {
        this.setState({ tallies: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("/tally-list/count/" + user.id.toString())
      .then(response => {
        this.setState({ talliesCount: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }


    delete(tally) {
      axios
        .get("/tally-list/delete/" + tally._id)
        .then(console.log("Deleted"))
        .catch(err => console.log(err));
    }

  TalliesCount() {
    if (this.state.talliesCount != null) {
      return this.state.talliesCount.reverse().map(function(currentTally, i) {
        return <TallyCount tallyCount={currentTally} key={i} />;
      });
    }
  }

  render() {
    return (
      <div style={{ margin: "6rem" }}>
        <TallyForm />

        <div className="margin-top">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tally</th>
                <th>Occurrences</th>
              </tr>
            </thead>
            <tbody>{this.TalliesCount()}</tbody>
          </table>
        </div>

        <div className="margin-top">
          <h3>Tally Records</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tally</th>
                <th>Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tallies.reverse().map((tally, id) => (
               <tr key={tally._id}>
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

TallyList.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(TallyList);
