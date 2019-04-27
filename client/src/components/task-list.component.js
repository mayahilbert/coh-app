import React, { Component } from 'react';
import TaskForm from "./TaskForm";

export default class TaskList extends Component {

      render() {
          return (
              <div style={{margin: "6rem"}}>
                  <TaskForm />
              </div>
          )
      }
  }
