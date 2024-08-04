import React, { useState } from 'react';
import FlightSearch from '../components/search/FlightSearch';
import FlightResults from '../components/flights/FlightResults';
import './CheapFlights.css';

const CheapFlights = () => {
  const [results, setResults] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");

  return (
    <div className="CheapFlights">
      <h1>Cheap Flights</h1>
      <FlightSearch setResults={setResults} setCurrencySymbol={setCurrencySymbol} />
      <FlightResults results={results} currencySymbol={currencySymbol} />
    </div>
  );
};

export default CheapFlights;