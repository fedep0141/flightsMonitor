import Home from './pages/Home';
import CheapFlights from './pages/CheapFlights';
import BestDepartFlights from './pages/BestDepartFlights';
import './App.css';
import logo from "./assets/images/logo.svg";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <a className="logoContainer" href="/">
        <img className="logo" src={logo} alt='Flight Monitor logo'></img>
      </a>
      <div className="mainContainer">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cheapFlights" element={<CheapFlights />} />
            <Route path="/bestDepartFlights" element={<BestDepartFlights />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;