const express = require('express')
const dbUtils = require('../dbUtils');

var router = express.Router();

router.get('/', (req, res) => {
    dbUtils.getApartments()
    .then(apartmentsData => res.send(apartmentsData))
    .catch(err => res.send(err));    
});

router.get('/id', (req, res) => {
  console.log('id of ' + req.query.id);
  dbUtils.getApartmentbyId(req.query.id)
  .then(apartmentData => res.send(apartmentData))
  .catch(err => res.send(err));    
});

router.post('/', function(req, res) {
    console.log(req.body);
    dbUtils.insertApartment(req.body);
    res.send('respond with a resource');
  });
  
  router.put('/id', function(req, res) {
    console.log('id of ' + req.query.id);
    console.log(req.body);
    dbUtils.updateApartmentbyId(req.query.id, req.body)
    .then(apartmentData => res.send(apartmentData))
    .catch(err => res.send(err));    
  });
  
  
module.exports = router; 