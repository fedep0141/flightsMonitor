import React from 'react';
import FlightCard from './FlightCard';
import './FlightResults.css';

const FlightResults = ({ results, currencySymbol }) => {
  return (
    <div>
      <h2>Flight Results</h2>
      {results.length > 0 ? (
            <div className="flightsContainer">
            {results.map((flight, index) => (
              <FlightCard key={index} flight={flight} currencySymbol={currencySymbol} />
            ))}
          </div>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightResults;