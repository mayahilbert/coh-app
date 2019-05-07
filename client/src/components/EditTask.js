import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import moment from "moment";

class EditTask extends Component {

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

    componentDidMount() {


        axios
        .get("/task-list/task/"+ this.props.match.params.id)
            .then(res => {
              console.log("id in edittask: "  + this.props.match.params.id);

                this.setState({

                    task_name: res.data.task_name,
                    task_user: res.data.task_user,
                    task_time: moment(res.data.task_time).format("YYYY-MM-DDTkk:mm")
                })


            })
            .catch(function (error) {
                console.log(error);
            });
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
        const updatedTask = {
          task_name: this.state.task_name,
          task_user: this.state.task_user,
          task_time: this.state.task_time
        };
        console.log(updatedTask);
        axios.post('/task-list/update/'+this.props.match.params.id, updatedTask)
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
                            defaultValue={this.state.task_user}
                            onChange={this.onChangeTaskUser}
                            />
                </div>
                    <div className="form-group">
                        <label>Task: </label>
                        <input  type="text"
                                className="form-control"
                                defaultValue={this.state.task_name}
                                onChange={this.onChangeTaskName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                defaultValue={this.state.task_time}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(EditTask);
