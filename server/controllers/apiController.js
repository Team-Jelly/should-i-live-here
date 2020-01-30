const db = require('../models/db');

// controller for accessing city database
// controller for accessing city databse

// npm package that allows the use of fetch without the browser (ie in postman)
const fetch = require('isomorphic-fetch');

// app identifier to allow more queries to database
const appToken = 'rvAoMk2CVgwcxb3uzQw8lxP1k';

const apiController = {};

// function to format string correctly with regex for database query
const format = (str) => {
  const string = str.replace(/(th)|(st)|(nd)|(rd)\b/i, '')
    .replace(/st/i, 'STREET')
    .replace(/ave?/i, 'AVENUE')
    .replace(/blvd/i, 'BOULEVARD')
    .replace(/pl/i, 'PLACE')
    .replace(/pt/i, 'POINT')
    .replace(/\b(w)\b/i, 'WEST')
    .replace(/\b(e)\b/i, 'EAST')
    .replace(/\b(s)\b/i, 'SOUTH')
    .replace(/\b(n)\b/i, 'NORTH')
    .replace(/  +/g, ' ')
    .trim()
    .toUpperCase();
  return string;
};

// function to fetch data from the api
apiController.getData = (req, res, next) => {
  const address = format(req.body.address);
  const borough = req.body.borough.toUpperCase();

  fetch(`https://data.cityofnewyork.us/resource/erm2-nwe9.json?incident_address='${address}'&$where=borough='${borough}'`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': appToken,
      },
    })
    .then((data) => data.json())
    .then((data) => {
      const filteredData = data.map((elem) => ({
        date: elem.created_date,
        address: elem.incident_address,
        borough: elem.borough,
        complaintType: elem.complaint_type,
        description: elem.descriptor,
      }));
      res.locals.data = filteredData;
      if (res.locals.data.length >= 1) {
        res.locals.info = { addressFinal: address, boroughFinal: borough, userID: req.body.userId }
      } else {
        res.locals.info = false
      }
    })
    .then(next)
    .catch((err) => next({
      log: err,
      message: { err: 'there was an error fetching 311 data' },
    }));
};

// // add to history table
// apiController.addHistory = (req, res, next) => {

// }

module.exports = apiController;
