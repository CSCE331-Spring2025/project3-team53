import React, {useEffect, useState, useContext} from 'react';
import { Link } from "react-router-dom";
import { get_inventory, edit_inventory_quantity } from '../apiCall';
import { GlobalContext } from './GlobalContext';

const Inventory = () => {  
    const tableColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'type', title: 'Type' },
      { key: 'quantity', title: 'Quantity' },
    ];

    const {loginID} = useContext(GlobalContext);
    const[ID, setID] = useState(0);
    const[quantity, setQuantity] = useState(1);
    const [tableData, setTable] = useState([]);

    //load inventory data
    useEffect(() => {
      get_inventory(loginID).then(res => {setTable(res.data)});
    },[])

    //handle edit request to inventory
    const handleButton = async (isAdd) => {
      if(isAdd === true){
        await edit_inventory_quantity(ID, quantity, false);
      }
      else{
        await edit_inventory_quantity(ID, -quantity, false);
      }
      get_inventory(1).then(res => {setTable(res.data)});
    }
    function handleIDChange(event) {
        setID(Number(event.target.value));
    } 

    function handleQuantityChange(event) {
        setQuantity(Number(event.target.value));
    } 

    
    return (
      <div>
        <h2 className = "login-header">Inventory</h2>
        {/*loads inventory table*/}
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
        {/*edit inventory options*/}
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
          <button className="invent" onClick={() => {handleButton(true)}}>Add Ingredient/s</button>
          <button className="invent" onClick={() => {handleButton(false)}}>Remove Ingredient/s</button>
        </div>
        <Link to="/Manager">
          <button>Go Back</button>
        </Link>
      </div>
    );
  };
  
  export default Inventory;
  