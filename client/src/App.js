import CheapFlights from './pages/CheapFlights';
import './App.css';
import logo from "./assets/images/logo.svg";

const App = () => {
  return (
    <div className="App">
      <img className="logo" src={logo} alt='Flight Monitor logo'></img>
      <div className="mainContainer">
        <CheapFlights />
        {/* <CheapFlights /> */}
      </div>
    </div>
  );
};

export default App;