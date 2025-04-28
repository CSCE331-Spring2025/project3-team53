import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as func from "../apiCall"
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend);


const Logging = () => {
  const [hr, setHr] = useState([]);
  const [data, setData] = useState([[],[],[]]);
  const [date, setDate] = useState("");
  const [hourF, sethourF] = useState("11");
  const [hourT, sethourT] = useState("22");

  const handleMakeReport = async () => {
    let res = (await func.order_hist(date, hourF, hourT));
    if(res.hasOwnProperty('data')){
      let data = res.data
      let newHrs = [], newData = [[],[],[]];
      data.forEach((row) => {
        newHrs.push(row.hr);
        newData[0].push(Number(row.sum_dollar));
        newData[1].push(Number(row.sum_drinks));
        newData[2].push(Number(row.sum_orders));
      })
      setHr(newHrs);
      setData(newData);
    }
  }

  const chartData = {
    labels: hr,
    datasets: [
      {
        label: "Dollar earned",
        data: data[0],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: "Drinks ordered",
        data: data[1],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: "Total orders",
        data: data[2],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      }
    ]
  };

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

  return (
    <>
      <h2 className="login-header">X-Report</h2>
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
      <input className = "date" type="date" placeholder="Select a date" onChange={(e) => {setDate(e.target.value)}}/>
      <br/>
      
      <label for="from">From: </label>
      <select name="from" id="from" value={hourF} onChange={(e) => {sethourF(e.target.value)}}>
        {Array.from({ length: 12 }, (_, i) => {
          const hour = i + 11;
          return <option key={hour} value={hour}>{hour}:00</option>;
        })}
      </select>

      <label for="to">To: </label>
      <select name="to" id="to" value={hourT} onChange={(e) => {sethourT(e.target.value)}}>
        {Array.from({ length: 12 }, (_, i) => {
          const hour = i + 11;
          return <option key={hour} value={hour}>{hour}:00</option>;
        })}
      </select>


      <div>
        <button className="log" onClick={() => {handleMakeReport()}}>Make Report</button>
        <button className="log" onClick={() => {setData([])}}>Clear</button>
      </div>
      <Link to="/Manager">
        <button>Go Back</button>
      </Link>

      <Link to="/ZReport">
        <button className="rider">Go to Z Report</button>
      </Link>
    </>
  );
};

export default Logging;