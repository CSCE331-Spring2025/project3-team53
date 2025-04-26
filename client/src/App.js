import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerLogin from "./components/ManagerLogin.jsx";
import EmployeeLogin from "./components/EmplyeeLogin.jsx";
import Checkout from './components/Checkout.jsx';
import Debug from "./components/Debug.jsx";
import Home from "./components/Home.jsx";
import OverallLogin from './components/OverallLogin.jsx';
import Manager from "./components/Manager.jsx";
import Categories from './components/Categories.jsx';
import Options from './components/Options.jsx';
import Inventory from './components/Inventory.jsx';
import OrderHistory from './components/OrderHistory.jsx';
import Logging from './components/Logging.jsx';
import ZReport from './components/ZReport.jsx';
import Settings from './components/Settings.jsx';
import Editor from './components/Editor.jsx';
import EmployeeEditor from './components/EmployeeEditor.jsx';
import PriceEditor from './components/PriceEditor.jsx';
import MenuEditor from './components/MenuEditor.jsx';
import CustomerOptions from './components/CustomerCategories.jsx';
import CustomerMenu from './components/CustomerMenu.jsx';
import Menu from './components/Menu.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Debug" element={<Debug />} />
        <Route path="/Customer" element={<OverallLogin />} />
        <Route path="/Malogin" element={<ManagerLogin />} />
        <Route path="/Debug" element={<Debug />} />
        <Route path="/Emplogin" element={<EmployeeLogin />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Checkout" element={< Checkout/>} />
        <Route path="/Manager" element={< Manager/>} />
        <Route path="/Options" element={<Options />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/OrderH" element={<OrderHistory />} />
        <Route path="/Logging" element={<Logging />} />
        <Route path="/ZReport" element={<ZReport />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Editor" element={<Editor />} />
        <Route path="/MenuEditor" element={<MenuEditor />} />
        <Route path="/PriceEditor" element={<PriceEditor />} />
        <Route path="/EmployeeEditor" element={<EmployeeEditor />} />
        <Route path="/CustomerOptions" element={<CustomerOptions/>} />
        <Route path="/CustomerMenu/:category" element={<CustomerMenu/>} />
        <Route path="/menu/:category" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
