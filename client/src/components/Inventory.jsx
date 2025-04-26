import React, {useState} from 'react';
import { Link } from "react-router-dom";

//Component for viewing and editing inventory table
const Inventory = () => {
    const tableData = [
      { id: 1, name: "mini_pearl", type: "Ingredient", store_id: 1, quantity: 100  },
      { id: 1, name: "mini_pearl", type: "Ingredient", store_id: 1, quantity: 100  },
    ];
  
    const tableColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'type', title: 'Type' },
      { key: 'store_id', title: 'Store ID' },
      { key: 'quantity', title: 'Quantity' },
    ];

    const[ID, setID] = useState(0);
    const[quantity, setQuantity] = useState(1);

    function handleIDChange(event) {
        setID(event.target.value);
    } 

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    } 

  
    return (
      <div>
        <h2 className = "login-header">Inventory</h2>
        <table border="1">
          <thead>
            <tr>
              {tableColumns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {tableColumns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        <p>Enter Ingredient ID:&nbsp;&nbsp;&nbsp;    
        <input value = {ID} onChange = {handleIDChange}  type = "number"/>
        </p>
        <br/>
        <p>Enter Quantity:&nbsp;&nbsp;&nbsp;
        <input value = {quantity} onChange = {handleQuantityChange} type = "number"/>
        </p>
        <br/>
        <div>
      <button className="invent">Add Ingredient/s</button>
      <button className="invent">Remove Ingredient/s</button>
        </div>
        <Link to="/Manager">
        <button>Go Back</button>
      </Link>
      </div>
    );
  };
  
  export default Inventory;
  