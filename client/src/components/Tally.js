import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
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
          <Link to={"/tally-list/edit/" + this.props.tally._id} className="btn btn-large">Edit</Link>
        </td>
        <td>
        <Link to="/confirm-delete-tally">
                    <button onClick={() => {this.delete ();
          }} className="btn btn-large coh-yellow white-text btn-delete">Delete</button>
          </Link>
        </td>
      </tr>
    );
  }
}

export default Tally;
