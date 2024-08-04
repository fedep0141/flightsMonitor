import React, { useState } from 'react';
import FlightSearch from '../components/search/FlightSearch';
import FlightResults from '../components/flights/FlightResults';
import './BestDepartFlights.css';
import axios from "axios";
import { format } from 'date-fns';

const BestDepartFlights = () => {
  const [results, setResults] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [loading, setLoading] = useState(false);

  const searchBestDepartFlights = async (origin, destination, departDate, returnDate, maxPrice, currency) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${process.env.REACT_APP_SERVER_IP || 'localhost'}:5000/flightsEachDay`, {
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
      console.log(response.data)
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="BestDepartFlights">
      <h1>Best Depart Flights</h1>
      <FlightSearch searchFlights={searchBestDepartFlights} searchType={"BestDepartFlights"} />
      <FlightResults results={results} currencySymbol={currencySymbol} loading={loading} />
    </div>
  );
};

export default BestDepartFlights;