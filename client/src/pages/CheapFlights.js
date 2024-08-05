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

  const searchCheapFlights = async (origin, destination, departDate, returnDate, maxPrice, currency, monthPickerDepart, monthPickerReturn) => {
    try {
      setLoading(true);
      if (departDate !== undefined) {
        monthPickerDepart ? departDate = format(departDate, 'yyyy-MM') : departDate = format(departDate, 'yyyy-MM-dd')
      } else departDate = format(new Date(), 'yyyy-MM')
      if (returnDate !== undefined) {
        monthPickerReturn ? returnDate = format(returnDate, 'yyyy-MM') : returnDate = format(returnDate, 'yyyy-MM-dd')
      } else returnDate = format(new Date(), 'yyyy-MM')
      const response = await axios.get(`http://${process.env.REACT_APP_SERVER_IP || 'localhost'}:5000/flightsByPrice`, {
        params: {
          origin: origin.value,
          destination: destination?.value,
          departDate,
          returnDate,
          maxPrice: maxPrice || 0,
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