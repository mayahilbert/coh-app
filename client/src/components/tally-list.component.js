import React, { Component } from 'react';

export default class TallyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tally_name: '',
        tally_time: ''
    }

    this.onChangeTallyName = this.onChangeTallyName.bind(this);
    this.onChangeTallyTime = this.onChangeTallyTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

        console.log(`Form submitted:`);
        console.log(`Tally Name: ${this.state.tally_name}`);
        console.log(`Tally Time: ${this.state.tally_time}`);

        this.setState({
            tally_name: '',
            tally_time: ''
        })
    }

  createTallyDropdown() {
    let tallies = [];
    for (let i = 0; i <= this.props.maxValue; i++) {
         tallies.push(<option key={i} value={i}>{i}</option>);
    }
    return tallies;
}

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Tally</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tally: </label>
                        <input type="select"
                        className="form-control"
                        onChange={this.onChangeTallyName}
                        value={this.createTallyDropdown()}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.tally_time}
                                onChange={this.onChangeTallyTime}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Tally" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
