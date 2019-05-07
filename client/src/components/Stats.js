import React, { Component } from 'react';
import TaskStats1 from './TaskStats1';
import TallyStats1 from './TallyStats1';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/authActions";
import AccessBlock from './AccessBlock';



class Stats extends Component {
constructor(props){
  super(props);
  const { user } = this.props.auth;

this.state = {
  isAdmin : false,
  user_name : user.name,
  user_id : user.id
  }
  console.log(user);

}
componentDidMount(){
  if(this.state.user_id === "5ccc88eb30fff820a053d278")
  {
      this.setState ({
        isAdmin : true
      });
      console.log(this.state.isAdmin);

  }
}

  render() {

return(
<div>
<Tabs defaultActiveKey="tasks" className="bg-light tabs">
  <Tab eventKey="tasks" title="Tasks" className="tab">
  { this.state.isAdmin ? <TaskStats1 /> : <AccessBlock /> }
  </Tab>
  <Tab eventKey="tallies" title="Tallies" className="tab">
  { this.state.isAdmin ? <TallyStats1 /> : <AccessBlock /> }
  </Tab>
</Tabs>


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
