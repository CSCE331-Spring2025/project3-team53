import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ingred_hist } from "../apiCall";
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend);

const OrderHistory = () => {
  //bar chart data
  const [ingredient, setIngredient] = useState([]);
  const [data, setData] = useState([]);

  //fetch analysis data parameter
  const [startDate, setSDate] = useState("");
  const [endDate, setEDate] = useState("");

  //fetch data from backend then populate graph
  const handleButton = async (start_date, end_date) => {
    let newIngredient = [], newData = [];
    let arr = (await ingred_hist(start_date, end_date)).data;
    arr.forEach(element => {
      newIngredient.push(element[0])
      newData.push(Number(element[1]));
    });
    setIngredient(newIngredient);
    setData(newData);
  };

  //bar chart data format
  const chartData = {
    labels: ingredient,
    datasets: [
      {
        label: "Amount used",
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      }
    ]
  };

  //bar chart settings
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grouped Bar Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-Axis Values',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    }
  }

  // Calculate the maximum value for scaling
  // const maxValue = Math.max(...data.map((item) => item.value));
  // const chartHeight = 300; // Height of the chart
  // const barWidth = 80;     // Width of each bar

  return (
    <div>
      <h2 className = "login-header">Order History</h2>

      {/*bar chart*/}
      <div
        style={{
          width: "80vw",
          height: "30vw",
          backgroundColor: "#cccccc",
          border: "2px solid black",
          margin: "0 auto",
          marginBottom: "2vw",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
        }}
      >
      <center style={{width: "80vw", height: "30vw"}}>
        <Bar data={chartData} options={options}/>
      </center>
      </div>
      <br/>
      
      {/*datetime selector*/}
      <div className = "range">
        <input type="date" placeholder="Select a date" onChange={(e) => {setSDate(e.target.value)}}/>
        <p>-----</p>
        <input type="date" placeholder="Select a date" onChange={(e) => {setEDate(e.target.value)}}/>
      </div>
      <div>
        <button onClick={() => {handleButton(startDate,endDate)}}>Generate graph</button>
      </div>
      <Link to="/Manager">
        <button>Go Back</button>
      </Link>
    </div>
  );
};
export default OrderHistory;
