import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from 'react-chartjs-2';
import AuthContext from "../../contexts/AuthContext";

import API from "../../lib/API";


// const [data, setData] = useState([
//   {
//     type: 'Doughnut',
//     data: {
//     labels:['Food', "Travel", "Home", "Consumable Items"],
//     datasets:[{
//       label: "Points",
//       data:[0, 0, 0, 0],
//       backgroundColor:[],
//       borderWidth:1,
//       borderColor: '',
//       hoverBorderWidth:3,
//       hoverBorderColor:'',
//     }]
//     },
//     options: { 
//       title:{
//         display:true,
//         text: "",
//         fontSize:25,
//       },
//       legend:{
//         display:true,
//         position: 'right',
//         labels:{
//           fontColor: '#000'
//         }
//       },
//       layout: {
//         // padding:{
        
//         // }
//       },
//       maintainAspectRatio: false,
//       responsive: true,
//     }
//   }
// ])

// useEffect(() => {
//  API.Challenges.getLastFivePointsByTotal()

// }, [setData]);

// return (
//   <div className="App">
//     <div>
//       <Chart data={data} />
//     </div>
//   </div>
// );
// }



const Chart = (props) => {
  const userInfo = useContext(AuthContext);
  const [userValues, setUserValues] = useState([])
  const [data, setData] = useState([
    {
      type: 'Doughnut',
      data: {
      labels:['Food', "Travel", "Home", "Consumable Items"],
      datasets:[{
        label: "Points",
        data:userValues,
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
   API.Challenges.getLastFivePointsByTotal(userInfo.authToken)
    .then(arrayOfObj => {
      return arrayOfObj.map(obj => {
        const arrayOfValues = [obj.food, obj.travel, obj.home, obj.consumableItems]

        return arrayOfValues
      })
    })
    .then(data => {
      setUserValues(data[0])
    })
  }, [setData]);
  
  return (
    <div className="App">
      <div>
        <Chart data={data} />
      </div>
    </div>
  )
  // const chartContainer = useRef(null);
  // const [chartInstance, setChartInstance] = useState(null);

  // useEffect(() => {
  //   if(chartContainer && chartContainer.current) {
  //     const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
  //     setChartInstance(newChartInstance);
  //   }

  // }, [chartContainer]);

  // return(
  //   <div>
  //     <canvas ref={chartContainer}/>
  //   </div>
  // )

}

export default Chart;