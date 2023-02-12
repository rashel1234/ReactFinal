const express = require('express')
const dbUtils = require('../dbUtils');

var router = express.Router();

router.get('/', (req, res) => {
    dbUtils.getApartments()
    .then(apartmentsData => res.send(apartmentsData))
    .catch(err => res.send(err));    
});

router.post('/', function(req, res) {
    console.log(req.body);
    dbUtils.insertApartment(req.body);
    res.send('respond with a resource');
  });
  

module.exports = router; 