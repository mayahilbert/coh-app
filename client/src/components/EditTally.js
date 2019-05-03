import React, { Component } from 'react';
import axios from 'axios';

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
        axios.get('/tally-list'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    tally_name: response.data.tally_name,
                    tally_time: response.data.tally_time
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
        const obj = {
          tally_name: this.state.tally_name,
          tally_time: this.state.tally_time
        };
        console.log(obj);
        axios.post('tally-list/update/'+this.props.match.params.id, obj)
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
                                value={this.state.tally_name}
                                onChange={this.onChangeTallyName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                value={this.state.tally_time}
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
