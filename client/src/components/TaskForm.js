import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from "react-redux";


class TaskForm extends Component {

  constructor(props) {
    super(props);

    const { user } = this.props.auth;

    this.state = {
        task_name: '',
        task_user: '',
        task_time: this.setDefaultDate(),
        owner_id: user.id,
        owner_name: user.name
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
        console.log(`Task Owner: ${this.state.owner_id}`);
        console.log(`Task Owner Name: ${this.state.owner_name}`);


           const newTask = {
               task_name: this.state.task_name,
               task_user: this.state.task_user,
               task_time: this.state.task_time,
               owner_id: this.state.owner_id,
               owner_name: this.state.owner_name

           };

           axios.post('/task-list/add', newTask)
               .then(res => console.log(res.data));

        this.setState({
            task_name: '',
            task_user: '',
            task_time: this.setDefaultDate(),
        });

        window.location.reload();

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
    return moment(d).format("YYYY-MM-DDTkk:mm");
  }

      render() {


          return (
              <div style={{marginTop: 10}}>
                  <h3>Create New Task</h3>
                  <form onSubmit={this.onSubmit}>

                  <div className="form-group">
                      <label>Cohabitant: </label>
                      <input type="text"
                      className="form-control"
                      onChange={this.onChangeTaskUser}
                      value={this.state.task_user}
                    //  value={this.createTaskDropdown()}
                      />
                  </div>


                      <div className="form-group">
                          <label>Task: </label>
                          <input type="text"
                          className="form-control"
                          onChange={this.onChangeTaskName}
                          value={this.state.task_name}
                        //  value={this.createTaskDropdown()}
                          />

                      </div>

                      <div className="form-group">
                          <label>Time: </label>
                          <input
                                  type="datetime-local"
                                  className="form-control"
                                  defaultValue={this.setDefaultDate()}
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


  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps
  )(TaskForm);
