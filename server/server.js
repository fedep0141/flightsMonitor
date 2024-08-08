const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors({
  origin: '*',
  credentials: true,
}));

const filterByPrice = (data, maxPrice) => {
  const filteredResults = [];
  Object.keys(data.data).forEach(location => {
    Object.keys(data.data[location]).forEach(flightId => {
      const flight = data.data[location][flightId];
      if (flight.price <= maxPrice || maxPrice == 0) {
        flight.iataCode = location
        filteredResults.push(flight)
      }
    });
  });
  return filteredResults;
}

const filterByPrice2 = (data, maxPrice) => {
  const filteredResults = [];
  Object.keys(data.data).forEach(flightId => {
    const flight = data.data[flightId];
    if (flight.price <= maxPrice || maxPrice == 0) {
      flight.iataCode = flight.destination
      filteredResults.push(flight)
    }
  });
  return filteredResults;
}

app.get('/flightsByPrice', async (req, res) => {
  try {
    const response = await axios.get('https://api.travelpayouts.com/v1/prices/cheap', {
      params: {
        origin: req.query.origin,
        destination: req.query.destination,
        depart_date: req.query.departDate,
        return_date: req.query.returnDate,
        currency: req.query.currency,
        token: process.env.API_TOKEN
      }
    });
    res.json(filterByPrice(response.data, req.query.maxPrice));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/flightsEachDay', async (req, res) => {
  try {
    const response = await axios.get('https://api.travelpayouts.com/v1/prices/calendar', {
      params: {
        origin: req.query.origin,
        destination: req.query.destination,
        depart_date: req.query.departDate,
        return_date: req.query.returnDate,
        calendar_type: "departure_date",
        currency: req.query.currency,
        token: process.env.API_TOKEN
      }
    });
    res.json(filterByPrice2(response.data, req.query.maxPrice));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});