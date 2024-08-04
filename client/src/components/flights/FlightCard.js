import React from 'react';
import Calendar from 'react-calendar';
import './FlightCard.css';
import airports from '../../data/airports.json';
import airlines from '../../data/airlines.json';
import 'react-calendar/dist/Calendar.css';

const FlightCard = ({ flight, currencySymbol }) => {
    const getAirportName = (iataCode) => {
        const airport = airports.airports.find(airport => airport.code === iataCode);
        return airport ? `${airport.city}, ${airport.country}` : 'Unknown Airport';
    };

    const getAirlineSite = (airlineCode) => {
        const airline = airlines.airlines.find(airline => airline.code === airlineCode);
        return airline ? `${airline.site}` : '';
    };

    return (
        <a className="card" href={getAirlineSite(flight.airline)} target='_blank' rel="noreferrer">
            <div className="cardHeader">
                <span>{getAirportName(flight.iataCode) + " (" + flight.iataCode + ")"}</span>
                <span>{currencySymbol}{flight.price}</span>
            </div>
            <div className="cardBody">
                <div className="calendar-container">
                    <Calendar
                        value={[new Date(flight.departure_at), new Date(flight.return_at)]}
                        selectRange
                    />
                </div>
                <p><strong>Departure:</strong> {new Date(flight.departure_at).toLocaleString()}</p>
                <p><strong>Return:</strong> {new Date(flight.return_at).toLocaleString()}</p>
                <p><strong>Expires At:</strong> {new Date(flight.expires_at).toLocaleString()}</p>
            </div>

        </a>
    );
};

export default FlightCard;