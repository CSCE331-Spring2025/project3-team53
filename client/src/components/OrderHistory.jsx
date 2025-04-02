import React from "react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  // Example data
  const data = [
    { label: "Ingredient 1", value: 10 },
    { label: "Ingredient 2", value: 20 },
    { label: "Ingredient 3", value: 15 }, //TODO, fetch from database
    { label: "Ingredient 4", value: 5 },
    { label: "Bruhbas", value: 50}
  ];

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));
  const chartHeight = 300; // Height of the chart
  const barWidth = 80;     // Width of each bar

  return (
    <div>
      <h2 className = "login-header">Order History</h2>
      <svg width={data.length * barWidth + 50} height={chartHeight + 50}>
        {/* Y-axis line */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2={chartHeight}
          stroke="black"
          strokeWidth="2"
        />
        {/* Y-axis label */}
        <text
          x="0"
          y={chartHeight / 2}
          transform={`rotate(-90, 10, ${chartHeight / 2})`}
          fontSize="12"
          textAnchor="middle"
        >
          Orders
        </text>

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          return (
            <rect
              key={index}
              x={index * barWidth + 40} // Offset bars from Y-axis
              y={chartHeight - barHeight}
              width={barWidth - 10}
              height={barHeight}
              fill="teal"
            />
          );
        })}
        {/* X-axis labels */}
        {data.map((item, index) => (
          <text
            key={index}
            x={index * barWidth + 40 + (barWidth - 10) / 2}
            y={chartHeight + 15}
            textAnchor="middle"
            fontSize="10"
          >
            {item.label}
          </text>
        ))}
      </svg>
      <br/>
      <div className = "range">
      <input type="date" placeholder="Select a date" />
      <p>-----</p>
      <input type="date" placeholder="Select a date" />
      </div>
      <Link to="/Manager">
        <button>Go Back</button>
      </Link>
    </div>
  );
};
export default OrderHistory;
