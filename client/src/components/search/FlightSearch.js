import React, { useState } from "react";
import Select from "react-select"
import axios from "axios";
import { format } from 'date-fns';
import './FlightSearch.css';
import currenciesJson from '../../data/currencies.json';
import airportsJson from '../../data/airports.json';

const FlightSearch = ({ setResults, setCurrencySymbol }) => {
	const [origin, setOrigin] = useState({value: "MIL", label: "Milan (MIL)"});
	const [destination, setDestination] = useState(null);
	const [departDate, setDepartDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [maxPrice, setMaxPrice] = useState(0);
	const [currency, setCurrency] = useState({value: "EUR", label: "Euro", symbol: "€"});
	const [currencies] = useState(currenciesJson.currencies);
	const [airports] = useState(airportsJson.airports);

	const handleSearch = async () => {
		try {
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
		}
	};

	return (
		<div>
			<form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
				<div className="formContainer">
					<div className="formGroup columnOne">
						<label>From</label>
						<Select placeholder="City or Airport" options={airports} value={origin} onChange={setOrigin} required />
					</div>
					<div className="formGroup columnTwo">
						<label>To</label>
						<Select placeholder="City or Airport" options={airports} value={destination} onChange={setDestination} />
					</div>
					<div className="formGroup columnOne">
						<label>Depart</label>
						<input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
					</div>
					<div className="formGroup columnTwo">
						<label>Return</label>
						<input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
					</div>
					<div className="formGroup columnOne">
						<label>Max Price</label>
						<input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
					</div>
					<div className="formGroup columnTwo">
						<label>Currency</label>
						<Select options={currencies} value={currency} onChange={setCurrency} required />
					</div>
				</div>
				<button className="submitButton" type="submit">Search</button>
			</form>
		</div>
	);
};

export default FlightSearch