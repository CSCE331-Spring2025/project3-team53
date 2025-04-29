import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { add_new_employee, delete_entry } from "../apiCall";
import '../styles/empEditor.css'

//component with popups handling adding/deleting employees
const EmployeeEditor = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "Cashier", // Default Cashier
    store_id: "1" // Default store 1
  });
  const [status, setStatus] = useState(null);

  const positionOptions = [
    { value: "Cashier", label: "Cashier" },
    { value: "Manager", label: "Manager" }
  ];

  const storeIdOptions = [
    { value: "1", label: "Store 1 (College Station)" },
    { value: "2", label: "Store 2" },
    { value: "3", label: "Store 3" }
  ];

  const handleAddEmployee = async () => {
    if (!newEmployee.name) {
      setStatus({ success: false, message: "Please enter employee name" });
      return;
    }

    try {
      await add_new_employee(
        newEmployee.name,
        newEmployee.position,
        parseInt(newEmployee.store_id)
      );
      setStatus({ success: true, message: "Employee added successfully!" });
      setNewEmployee({ name: "", position: "Cashier", store_id: "1" });
      setTimeout(() => {
        setShowAddPopup(false);
        setStatus(null);
      }, 2000);
    } catch (error) {
      setStatus({ success: false, message: error.message || "Failed to add employee" });
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeId) {
      setStatus({ success: false, message: "Please enter an Employee ID" });
      return;
    }
    
    try {
      await delete_entry(2, parseInt(employeeId)); // 2 is for employee table
      setStatus({ success: true, message: "Employee deleted successfully!" });
      setEmployeeId("");
      setTimeout(() => {
        setShowDeletePopup(false);
        setStatus(null);
      }, 2000);
    } catch (error) {
      setStatus({ success: false, message: error.message || "Failed to delete employee" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="employee-editor-emp">
      <h1 className="title-emp">Employee Management</h1>
      
      <div className="action-buttons-emp">
        <button className="btn-emp add-btn-emp" onClick={() => setShowAddPopup(true)}>
          Add New Employee
        </button>
        <button className="btn-emp remove-btn-emp" onClick={() => setShowDeletePopup(true)}>
          Remove Employee
        </button>
        <Link to="/Editor" className="btn-emp back-btn-emp">
          Back
        </Link>
      </div>

      {/* Add Employee Popup */}
      {showAddPopup && (
        <div className="popup-overlay-emp">
          <div className="popup-content-emp">
            <h2>Add New Employee</h2>
            
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="Enter employee's full name"
              />
            </div>
            
            <div className="form-group">
              <label>Position:</label>
              <select
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
              >
                {positionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Store Location:</label>
              <select
                name="store_id"
                value={newEmployee.store_id}
                onChange={handleInputChange}
              >
                {storeIdOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {status && (
              <div className={`status-message ${status.success ? 'success' : 'error'}`}>
                {status.message}
              </div>
            )}
            
            <div className="popup-actions-emp">
              <button className="btn-emp submit-btn-emp" onClick={handleAddEmployee}>
                Add Employee
              </button>
              <button className="btn-emp cancel-btn-emp" onClick={() => setShowAddPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Employee Popup */}
      {showDeletePopup && (
        <div className="popup-overlay-emp">
          <div className="popup-content-emp">
            <h2>Remove Employee</h2>
            
            <div className="form-group">
              <label>Employee ID to Remove:</label>
              <input
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter employee ID"
              />
            </div>
            
            {status && (
              <div className={`status-message ${status.success ? 'success' : 'error'}`}>
                {status.message}
              </div>
            )}
            
            <div className="popup-actions-emp">
              <button className="btn-emp submit-btn-emp" onClick={handleDeleteEmployee}>
                Confirm Removal
              </button>
              <button className="btn-emp cancel-btn-emp" onClick={() => setShowDeletePopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeEditor;