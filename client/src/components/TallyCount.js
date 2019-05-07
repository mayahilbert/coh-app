import React, { Component } from 'react';

class TallyCount extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.tallyCount._id}</td>
        <td>{this.props.tallyCount.count}</td>
      </tr>
    );
  }
}

export default TallyCount;
