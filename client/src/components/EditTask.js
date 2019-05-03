import React, { Component } from 'react';
import axios from 'axios';

export default class EditTask extends Component {

    constructor(props) {
        super(props);

        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskUser = this.onChangeTaskUser.bind(this);
        this.onChangeTaskTime = this.onChangeTaskTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task_name: '',
            task_user: '',
            task_time: ''
        }
    }

    componentDidMount() {
        axios.get('/task-list'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    task_name: response.data.task_name,
                    task_user: response.data.task_user,
                    task_time: response.data.task_time
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {
          task_name: this.state.task_name,
          task_user: this.state.task_user,
          task_time: this.state.task_time
        };
        console.log(obj);
        axios.post('task-list/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/task-list');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Task</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Cohabitant: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.task_user}
                            onChange={this.onChangeTaskUser}
                            />
                </div>
                    <div className="form-group">
                        <label>Task: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.task_name}
                                onChange={this.onChangeTaskName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                value={this.state.task_time}
                                onChange={this.onChangeTaskTime}
                                />
                    </div>



                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-large coh-yellow white-text" />
                    </div>
                </form>
            </div>
        )
    }
}
