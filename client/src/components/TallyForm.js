import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";

class TallyForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        tally_name: '',
        tally_time: '',
        owner_id: ''
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

        const { user } = this.props.auth;

        this.setState({
            owner_id: user.name
        });

        console.log(`Form submitted:`);
        console.log(`Tally Name: ${this.state.tally_name}`);
        console.log(`Tally Time: ${this.state.tally_time}`);
        console.log(`Tally Owner: ${this.state.owner_id}`);


           const newTally = {
               tally_name: this.state.tally_name,
               tally_time: this.state.tally_time,
               owner_id: this.state.owner_id

           };

           axios.post('/tally-list/add', newTally)
               .then(res => console.log(res.data));

        this.setState({
            tally_name: '',
            tally_time: '',
            owner_id: ''
        });
    }

    createTallyDropdown() {
      let tallies = [];
      for (let i = 0; i <= this.props.maxValue; i++) {
           tallies.push(<option key={i} value={i}>{i}</option>);
      }
      return tallies;
  }

  setDefaultDate(){
    var d = new Date();
    return d;
  }

      render() {

          return (
              <div style={{marginTop: 10}}>
                  <h3>Create New Tally</h3>
                  <form onSubmit={this.onSubmit}>


                      <div className="form-group">
                          <label>Tally: </label>
                          <input type="text"
                          className="form-control"
                          onChange={this.onChangeTallyName}
                          value={this.state.tally_name}
                        //  value={this.createTallyDropdown()}
                          />

                      </div>

                      <div className="form-group">
                          <label>Time: </label>
                          <input
                                  type="datetime-local"
                                  className="form-control"
                                  value={this.setDefaultDate()}
                                  onChange={this.onChangeTallyTime}
                                  />
                      </div>

                      <div className="form-group">
                          <input type="submit" value="Create Tally" className="btn btn-large coh-yellow white-text" />
                      </div>
                  </form>
              </div>
          )
      }
  }

  TallyForm.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { setCurrentUser }
  )(TallyForm);
