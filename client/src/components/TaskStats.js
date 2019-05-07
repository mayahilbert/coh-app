import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';


export default class TaskStats extends Component{

  constructor(props) {
   super(props);
   this.state = {
     Data: {}
   }
 }

   componentDidMount() {
     axios.get(`/task-list`)
       .then(res => {
         const tasks = res.data;
         let task_name = [];
         let task_user = [];
        tasks.forEach(props => {
           task_name.push(props.task_name);
           playerscore.push(element.score);
         });
         this.setState({
           Data: {
             labels: task_user,
             datasets:[
                {
                   label:'Cohabitant',
                   data: playerscore ,
                   backgroundColor:[
                    'rgba(255,105,145,0.6)',
                    'rgba(155,100,210,0.6)',
                    'rgba(90,178,255,0.6)',
                    'rgba(240,134,67,0.6)',
                    'rgba(120,120,120,0.6)',
                    'rgba(250,55,197,0.6)'
                 ]
                }
             ]
          }
          });
       })
   }


  constructor(props){
    super(props);
    this.state = {
      chartData:{
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }    }
  }

  componentDidMount() {

    axios
      .get("/task-list")
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">

        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}
