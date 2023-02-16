const express = require('express')
const dbUtils = require('../dbUtils');

var router = express.Router();

router.get('/', (req, res) => {
  dbUtils.getStatistics()
  .then(countriesList => res.send(countriesList))
  .catch(err => res.send(err));    
});

module.exports = router;
