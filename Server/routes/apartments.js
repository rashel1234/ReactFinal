const express = require('express')
const dbUtils = require('../dbUtils');

var router = express.Router();

router.get('/', (req, res) => {
    dbUtils.getApartments()
    .then(apartmentsData => res.send(apartmentsData))
    .catch(err => res.send(err));    
});

module.exports = router; 