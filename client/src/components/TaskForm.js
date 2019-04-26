import React, { Component } from 'react';

export default class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        task_name: '',
        task_user: '',
        task_time: ''
    }

    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onChangeTaskUser = this.onChangeTaskUser.bind(this);
    this.onChangeTaskTime = this.onChangeTaskTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChangeTaskName(e) {
    this.setState({
        task_name: e.target.value
    });
}

onChangeTaskUser(e) {
    this.setState({
        task_user: e.target.value
    });
}

onChangeTaskTime(e) {
    this.setState({
        task_time: e.target.value
    });
}

onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Task Name: ${this.state.task_name}`);
        console.log(`Task User: ${this.state.task_user}`);
        console.log(`Task Time: ${this.state.task_time}`);

        this.setState({
            task_name: '',
            task_user: '',
            task_time: '',
        })
    }

    createTaskDropdown() {
      let tasks = [];
      for (let i = 0; i <= this.props.maxValue; i++) {
           tasks.push(<option key={i} value={i}>{i}</option>);
      }
      return tasks;
  }

  setDefaultDate(){
    var d = new Date();
    return d;
  }

      render() {
          return (
              <div style={{marginTop: 10}}>
                  <h3>Create New Task</h3>
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <label>Task: </label>
                          <input type="dropdown"
                          className="form-control"
                          onChange={this.onChangeTaskName}
                          value={this.createTaskDropdown()}
                          />

                      </div>
                      <div className="form-group">
                          <label>User: </label>
                          <input
                                  type="text"
                                  className="form-control"
                                  value={this.state.task_user}
                                  onChange={this.onChangeTaskUser}
                                  />
                      </div>
                      <div className="form-group">
                          <label>Time: </label>
                          <input
                                  type="time"
                                  className="form-control"
                                  value={this.setDefaultDate()}
                                  onChange={this.onChangeTaskTime}
                                  />
                      </div>

                      <div className="form-group">
                          <input type="submit" value="Create Task" className="btn btn-large coh-yellow white-text" />
                      </div>
                  </form>
              </div>
          )
      }
  }


export default TaskForm;
