import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

class Task extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

      }


      delete() {
          axios.get('/task-list/delete/'+this.props.task._id)
              .then(console.log('Deleted'))
              .catch(err => console.log(err))


            }


  render() {
    return (
      <tr>

      <td>{this.props.task.owner_id}</td>
      <td>{this.props.task.owner_name}</td>
      <td>{this.props.task._id}</td>
        <td>{this.props.task.task_name}</td>
        <td>{this.props.task.task_user}</td>
        <td>{this.props.task.task_time}</td>

        <td>
          <Link to={"/task-list/edit/" + this.props.task._id} className="btn btn-large">Edit</Link>
        </td>
        <td>
                    <button onClick={() => {this.delete (() => this.history.push("/task-list"));
          }} className="btn btn-large coh-yellow white-text btn-delete">Delete</button>
        </td>
      </tr>
    );
  }
}

export default Task;
