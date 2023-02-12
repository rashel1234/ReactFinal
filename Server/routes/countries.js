const express = require('express')
const dbUtils = require('../dbUtils');

var router = express.Router();

router.get('/', (req, res) => {
  dbUtils.getCountries()
  .then(countriesList => res.send(countriesList))
  .catch(err => res.send(err));    
});

router.get('/cities', (req, res) => {
  console.log('cities of ' + req.query.country);
  dbUtils.getCitiesByCountry(req.query.country)
  .then(citiesList => res.send(citiesList))
  .catch(err => res.send(err));    
});

module.exports = router;
