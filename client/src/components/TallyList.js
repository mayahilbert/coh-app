import React, { Component } from "react";
import TallyForm from "./TallyForm";
import Tally from "./Tally";
import { Link } from "react-router-dom";
import axios from "axios";


export default class TallyList extends Component {
  constructor(props) {
    super(props);
    this.state = { tallies: [] };
  }

  componentDidMount() {
    axios
      .get("/tally-list")
      .then(response => {
        this.setState({ tallies: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  Tallies() {
    return this.state.tallies.reverse().map(function(currentTally, i) {
      return <Tally tally={currentTally} key={i} />;
    });
  }

  render() {
    return (
      <div style={{ margin: "6rem" }}>
        <TallyForm />

        <div>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Tally</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{this.Tallies()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
