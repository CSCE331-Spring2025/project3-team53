import './App.css';
import Drinks from './components/Drinks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerLogin from "./components/ManagerLogin";
import EmployeeLogin from "./components/EmplyeeLogin";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malogin" element={<ManagerLogin />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/emplogin" element={<EmployeeLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
