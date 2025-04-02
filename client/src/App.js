import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerLogin from "./components/ManagerLogin.jsx";
import EmployeeLogin from "./components/EmplyeeLogin.jsx";
import Checkout from './components/Checkout.jsx';
import Home from "./components/Home";
import Manager from "./components/Manager";
import Categories from './components/Categories.jsx';
import MilkTea from './components/MilkTea.jsx';
import FruitTea from './components/FruitTea';
import BrewedTea from './components/BrewedTea';
import IceBlended from './components/IceBlended';
import FreshMilk from './components/FreshMilk';
import Crema from './components/Crema';
import Mojito from './components/Mojito';
import Specialty from './components/Specialty';
import BYOT from './components/BYOT';
import Options from './components/Options.jsx';
import Inventory from './components/Inventory.jsx';
import OrderHistory from './components/OrderHistory.jsx';
import Logging from './components/Logging.jsx';
import ZReport from './components/ZReport.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Malogin" element={<ManagerLogin />} />
        <Route path="/Emplogin" element={<EmployeeLogin />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Checkout" element={< Checkout/>} />
        <Route path="/Manager" element={< Manager/>} />
        <Route path="/Drinks/milkTea" element={<MilkTea />} />
        <Route path="/Drinks/fruitTea" element={<FruitTea />} />
        <Route path="/Drinks/brewedTea" element={<BrewedTea />} />
        <Route path="/Drinks/iceBlended" element={<IceBlended />} />
        <Route path="/Drinks/freshMilk" element={<FreshMilk />} />
        <Route path="/Drinks/crema" element={<Crema />} />
        <Route path="/Drinks/mojito" element={<Mojito />} />
        <Route path="/Drinks/specialty" element={<Specialty />} />
        <Route path="/Drinks/byot" element={<BYOT />} />
        <Route path="/Options" element={<Options />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/OrderH" element={<OrderHistory />} />
        <Route path="/Logging" element={<Logging />} />
        <Route path="/ZReport" element={<ZReport />} />
      </Routes>
    </Router>
  );
}

export default App;
