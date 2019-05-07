import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

export default class EditTally extends Component {

    constructor(props) {
        super(props);

        this.onChangeTallyName = this.onChangeTallyName.bind(this);
        this.onChangeTallyTime = this.onChangeTallyTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            tally_name: '',
            tally_time: ''
        }
    }

    componentDidMount() {
        axios.get('/tally-list/tally/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    tally_name: res.data.tally_name,
                    tally_time: moment(res.data.tally_time).format("YYYY-MM-DDTkk:mm")
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTallyName(e) {
        this.setState({
            tally_name: e.target.value
        });
    }

    onChangeTallyTime(e) {
        this.setState({
            tally_time: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const updatedTally = {
          tally_name: this.state.tally_name,
          tally_time: this.state.tally_time
        };
        console.log(updatedTally);
        axios.post('/tally-list/update/'+this.props.match.params.id, updatedTally)
            .then(res => console.log(res.data));

        this.props.history.push('/tally-list');
    }


    render() {
        return (
            <div>
                <h3 align="center">Update Tally</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tally: </label>
                        <input  type="text"
                                className="form-control"
                                defaultValue={this.state.tally_name}
                                onChange={this.onChangeTallyName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                defaultValue={moment(this.state.tally_time).format("YYYY-MM-DDTkk:mm")}
                                onChange={this.onChangeTallyTime}
                                />
                    </div>



                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Tally" className="btn btn-large coh-yellow white-text" />
                    </div>
                </form>
            </div>
        )
    }
}
