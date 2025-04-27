import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart"
import * as func from "../apiCall"

const Logging = () => {
  const series = [
    {dataKey: "sum_dollars", label: "dollar earned"},
    {dataKey: "sum_drinks", label: "indivdual drinks ordered"},
    {dataKey: "sum_orders", label: "total orders"},
  ]

  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [hourF, sethourF] = useState("11");
  const [hourT, sethourT] = useState("22");

  const handleMakeReport = async () => {
    let res = (await func.order_hist(date, hourF, hourT));
    if(res.hasOwnProperty('data')){
      let data = res.data
      let newHrs = [], newData = [];
      data.forEach((row) => {
        newData.push({hrs: row.hr, sum_dollars: Number(row.sum_dollar), sum_drinks:Number(row.sum_drinks), sum_orders:Number(row.sum_orders)});
      })
      setData(newData);
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
          <BarChart
            xAxis={[{ scaleType: 'band', dataKey: "hrs", label: "Hour" }]}
            series={series}
            dataset = {data}
            height={500}
          />
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