import React from 'react';
import FlightCard from './FlightCard';
import './FlightResults.css';
import ScaleLoader from "react-spinners/ScaleLoader";

const FlightResults = ({ results, currencySymbol, loading }) => {
  return (
    <div className='flightResultContainer'>
      <h3>Flight Results</h3>
      <ScaleLoader
        color="#e93b4f"
        loading={loading}
      />
      {
        results.length > 0 && !loading ? (
          <div className="flightsCardContainer">
            {results.map((flight, index) => (
              <FlightCard key={index} flight={flight} currencySymbol={currencySymbol} />
            ))}
          </div>
        ) : !loading ? (
          <p>No flights found.</p>
        ) : <></>
      }
    </div>
  );
};

export default FlightResults;