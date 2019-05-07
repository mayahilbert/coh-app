import React, { Component } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import moment from "moment";

import { setCurrentUser } from "../actions/authActions";


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: []
    };
    this.delete = this.delete.bind(this);


}

  componentDidMount() {

    const { user } = this.props.auth;

    axios
      .get("/task-list/" + user.id.toString())
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(task) {
      axios.get('/task-list/delete/'+task._id)
          .then(console.log('Deleted'))
          .catch(err => console.log(err))
        }

  Tasks() {
    if(this.state.tasks != null){
    return this.state.tasks.reverse().map(function(currentTask, i) {
      return <Task task={currentTask} key={i}/>;
    });
  }
  }

  render() {

    return (
      <div style={{ margin: "6rem" }}>
        <TaskForm />

        <div className="margin-top">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Task</th>
                <th>Cohabitant</th>
                <th>Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.tasks.reverse().map((task, id) => (
               <tr key={task._id}>
                <td>{task.task_name}</td>
                <td>{task.task_user}</td>
                <td>{task.task_time}</td>
                <td>
                  <Link to={"/task-list/edit/" + task._id} className="btn btn-large">Edit</Link>
                </td>
                <td>
                <Link to="/confirm-delete-task">

                            <button onClick={() => {this.delete (task);
                  }} className="btn btn-large coh-yellow white-text btn-delete">Delete</button>
                  </Link>
                </td>
              </tr>

            ))
            }
              </tbody>
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
