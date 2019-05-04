import React, { Component } from 'react';
import TaskStats from './TaskStats';
import axios from "axios";
import Tabs from 'react-bootstrap/Tabs';


export default class Stats extends Component {
  render() {
return(
<div>
<Tabs defaultActiveKey="tasks" id="uncontrolled-tab-example">
  <Tab eventKey="tasks" title="Tasks">
  <TaskStats location="Massachusetts" legendPosition="bottom"/>
  </Tab>
  <Tab eventKey="tallies" title="Tallies">
    <TaskStats />
  </Tab>
</Tabs>;


</div>
)
}


}
