import React, { Component } from 'react';
import TaskStats1 from './TaskStats1';
import TallyStats1 from './TallyStats1';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";



class Stats extends Component {


  render() {
    const { user } = this.props.auth;

return(
<div>
<p>{ user.role }</p>
<Tabs defaultActiveKey="tasks" className="bg-light tabs">
  <Tab eventKey="tasks" title="Tasks" className="tab">
  <TaskStats1 />
  </Tab>
  <Tab eventKey="tallies" title="Tallies" className="tab">
    <TallyStats1 />
  </Tab>
</Tabs>;


</div>
)
}


}


Stats.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Stats);
