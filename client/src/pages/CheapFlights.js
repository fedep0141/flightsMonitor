import React, { useState } from 'react';
import FlightSearch from '../components/search/FlightSearch';
import FlightResults from '../components/flights/FlightResults';
import './CheapFlights.css';
import axios from "axios";
import { format } from 'date-fns';

const CheapFlights = () => {
  const [results, setResults] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [loading, setLoading] = useState(false);

  const searchCheapFlights = async (origin, destination, departDate, returnDate, maxPrice, currency) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${process.env.REACT_APP_SERVER_IP || 'localhost'}:5000/flightsByPrice`, {
        params: {
          origin: origin.value,
          destination: destination?.value,
          departDate: departDate === "" ? format(new Date(), 'yyyy-MM') : departDate,
          returnDate: returnDate === "" ? format(new Date(), 'yyyy-MM') : returnDate,
          maxPrice,
          currency: currency.value
        },
      }
      );
      setCurrencySymbol(currency.symbol)
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="CheapFlights">
      <h1>Cheap Flights</h1>
      <FlightSearch searchFlights={searchCheapFlights} searchType={"CheapFlights"} />
      <FlightResults results={results} currencySymbol={currencySymbol} loading={loading} />
    </div>
  );
};

export default CheapFlights;