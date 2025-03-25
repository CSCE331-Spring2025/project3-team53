import './App.css';
import Drinks from './components/Drinks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/drinks" element={<Drinks />} />
      </Routes>
    </Router>
  );
}

export default App;
