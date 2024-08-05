import React, { useState } from "react";
import Select from "react-select"
import './FlightSearch.css';
import { DatePicker, InputNumber, Checkbox } from 'rsuite';
import currenciesJson from '../../data/currencies.json';
import airportsJson from '../../data/airports.json';
import 'rsuite/DatePicker/styles/index.css';
import 'rsuite/InputNumber/styles/index.css';
import 'rsuite/Checkbox/styles/index.css';

const FlightSearch = ({ searchFlights, searchType }) => {
	const [origin, setOrigin] = useState({ value: "MIL", label: "Milan (MIL)" });
	const [destination, setDestination] = useState(null);
	const [departDate, setDepartDate] = useState(undefined);
	const [returnDate, setReturnDate] = useState(undefined);
	const [maxPrice, setMaxPrice] = useState();
	const [currency, setCurrency] = useState({ value: "EUR", label: "Euro", symbol: "€" });
	const [currencies] = useState(currenciesJson.currencies);
	const [airports] = useState(airportsJson.airports);
	const [monthPickerDepart, setMonthPickerDepart] = useState(false);
	const [monthPickerReturn, setMonthPickerReturn] = useState(false);

	return (
		<div>
			<form onSubmit={(e) => { e.preventDefault(); searchFlights(origin, destination, departDate, returnDate, maxPrice, currency, monthPickerDepart, monthPickerReturn); }}>
				<div className="formContainer">
					<div className="formGroup columnOne">
						<label>From</label>
						<Select placeholder="City or Airport" options={airports} value={origin} onChange={setOrigin} required />
					</div>
					<div className="formGroup columnTwo">
						<label>To</label>
						<Select placeholder="City or Airport" options={airports} value={destination} onChange={setDestination} required={searchType === "BestDepartFlights"} />
					</div>
					<div className="formGroup columnOne">
						<label>Depart</label>
						{!monthPickerDepart && <DatePicker oneTap format="dd/MM/yyyy" placeholder="gg/mm/aaaa" value={departDate} onChange={setDepartDate} />}
						{monthPickerDepart && <DatePicker oneTap format="MM/yyyy" placeholder="mm/aaaa" value={departDate} onChange={setDepartDate} />}
						<div className="toggleContainer">
							<div className="toggleLabel">month</div>
							<label className="switch">
								<input type="checkbox" value={monthPickerDepart} onChange={() => setMonthPickerDepart(!monthPickerDepart)} />
								<div className="slider"></div>
							</label>
						</div>
					</div>
					<div className="formGroup columnTwo">
						<label>Return</label>
						{!monthPickerReturn && <DatePicker oneTap format="dd/MM/yyyy" placeholder="gg/mm/aaaa" value={returnDate} onChange={setReturnDate} />}
						{monthPickerReturn && <DatePicker oneTap format="MM/yyyy" placeholder="mm/aaaa" value={returnDate} onChange={setReturnDate} />}
						<div className="toggleContainer">
							<div className="toggleLabel">month</div>
							<label className="switch">
								<input type="checkbox" value={monthPickerReturn} onChange={() => setMonthPickerReturn(!monthPickerReturn)} />
								<div className="slider"></div>
							</label>
						</div>
					</div>
					<div className="formGroup columnOne">
						<label>Max Price</label>
						<InputNumber value={maxPrice} onChange={setMaxPrice} step={20} min={0} />
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