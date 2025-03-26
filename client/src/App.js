import './App.css';
import Drinks from './components/Drinks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerLogin from "./components/ManagerLogin.jsx";
import EmployeeLogin from "./components/EmplyeeLogin.jsx";
import Checkout from './components/Checkout.jsx';
import Home from "./components/Home";
import Manager from "./components/Manager";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malogin" element={<ManagerLogin />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/emplogin" element={<EmployeeLogin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
