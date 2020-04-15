import React, { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2'

import './style.css';
import API from "../../lib/API";

function App() {
  
  const [data, setData] = useState([
    {
      type: 'Doughnut',
      data: {
      labels:['Food', "Travel", "Home", "Consumable Items"],
      datasets:[{
        label: "Points",
        data:[0, 0, 0, 0],
        backgroundColor:[],
        borderWidth:1,
        borderColor: '',
        hoverBorderWidth:3,
        hoverBorderColor:'',
      }]
      },
      options: { 
        title:{
          display:true,
          text: "",
          fontSize:25,
        },
        legend:{
          display:true,
          position: 'right',
          labels:{
            fontColor: '#000'
          }
        },
        layout: {
          // padding:{
          
          // }
        },
        maintainAspectRatio: false,
        responsive: true,
      }
    }
  ])

  useEffect(() => {
   API.Challenges.getLastFivePointsByTotal()

  }, [setData]);

  return (
    <div className="App">
      <div>
        <Chart data={data} />
      </div>
    </div>
  );
}


const Chart = ({ data }) => {
  return (
    <div>
      <Doughnut data={data}>
      </Doughnut>
    </div>
  );

}
export default Chart;
