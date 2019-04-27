import React, { Component } from 'react';

export default class TaskNames extends Component {
  state = {
    task_names: [],
    selectedTask_Name: ""
  }

  componentDidMount() {
    fetch("/api/tasks")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let tasksFromApi = data.map(task_name => { return {value: task_name, display: task_name} })
      this.setState({ task_names: [{value: '', display: '(Select from past tasks}'}].concat(tasksFromApi) });
    }).catch(error => {
      console.log(error);
    });
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
