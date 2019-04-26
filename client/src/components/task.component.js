import React, { Component } from 'react';
import axios from 'axios';

export default class Task extends Component {
    render() {
        return (
            <div>
                <p>Welcome to Task Component!!</p>
            </div>

        )
    }
    constructor(props) {
        super(props);

        this.state = {
            task_name: '',
            task_user: '',
            task_time: ''
        }
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

           const newTask = {
               task_name: this.state.task_name,
               task_user: this.state.task_user,
               task_time: this.state.task_time,
           };

           axios.post('/task-list', newTask)
               .then(res => console.log(res.data));

        this.setState({
            task_name: '',
            task_user: '',
            task_time: ''
        })
    }
}
