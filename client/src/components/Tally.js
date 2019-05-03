import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class Tally extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

      }

      delete() {
          axios.get('/tally-list/delete/'+this.props.tally._id)
              .then(console.log('Deleted'))
              .catch(err => console.log(err))


            }


  render() {
    return (
      <tr>
        <td>{this.props.tally.tally_name}</td>
        <td>{this.props.tally.tally_time}</td>
        <td>
          <Link to={"/edit/" + this.props.tally._id} className="btn btn-large">Edit</Link>
        </td>
        <td>
                    <button onClick={() => {this.delete (() => this.history.push("/tally-list"));
          }} className="btn btn-large coh-yellow white-text btn-delete">Delete</button>
        </td>
      </tr>
    );
  }
}

export default Tally;
