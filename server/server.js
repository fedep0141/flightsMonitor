const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/flightsByPrice', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});