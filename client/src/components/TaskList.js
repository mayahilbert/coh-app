import React, { Component } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };

}

  componentDidMount() {

    axios
      .get("/task-list")
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  Tasks() {
    return this.state.tasks.reverse().map(function(currentTask, i) {
      return <Task task={currentTask} key={i} />;
    });
  }

  render() {

    return (
      <div style={{ margin: "6rem" }}>
        <TaskForm />

        <div>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Cohabitant</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{this.Tasks()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}


TaskList.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(TaskList);
