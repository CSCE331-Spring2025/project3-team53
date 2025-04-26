import { Link } from "react-router-dom";
import React, { useState } from 'react';


//Editor home page
const Editor = () => {

  return (
    <>
    <Link to="/MenuEditor">
    <button>Go to Menu Editor</button>
    </Link>
    <Link to="/PriceEditor">
    <button>Go to Price Editor</button>
    </Link>
    <Link to="/EmployeeEditor">
    <button>Go to Employee Editor</button>
    </Link>
    </>
  );
};

export default Editor;
