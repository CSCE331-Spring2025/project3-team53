import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Editor = () => {
  return (
    <>
    <div className="editor-buttons">
      <Link to="/MenuEditor">
        <button className="editor-tabs">Menu Editor</button>
      </Link>
        <Link to="/PriceEditor">
      <button className="editor-tabs">Price Editor</button>
        </Link>
      <Link to="/EmployeeEditor">
        <button className="editor-tabs">Employee Editor</button>
      </Link>
      <Link to="/Manager">
        <button className="editor-tabs">Go Back</button>
      </Link>
    </div>
    </>
  );
};

export default Editor;
