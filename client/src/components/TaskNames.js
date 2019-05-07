import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";

class TaskNames extends Component {
  constructor(props) {
    super(props);
  this.state = {
    tasks: [],
    task_names: [],
    selectedTask_Name: ""
  };
}

  componentDidMount() {

    const { user } = this.props.auth;

    axios.get("/task-list/" + user.id.toString())

    .then(response => {
      this.setState({ tasks: response.data.find({ task_name : 1 }) });
      console.log("tasks:" + this.state.tasks);

    })
    .catch(error => {
      console.log(error);
    });
  }

  TaskNamesMap(){
    let tasksFromApi = this.state.tasks.map(task_name => { return {value: task_name, display: task_name} });
    this.setState({ task_names: [{value: '', display: '(Select from past tasks}'}].concat(tasksFromApi) });
  }

  render() {
    return (
      <div>
        <select value={this.state.selectedTask_Name}
              onChange={(e) => this.setState({selectedTask_Name: e.target.value})}>
        {this.state.task_names.map((task_name) => <option key={task_name.value} value={task_name.value}>{task_name.display}</option>)}
      </select>
      </div>
    )
  }
}

TaskNames.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(TaskNames);
