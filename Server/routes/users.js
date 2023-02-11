var express = require('express');
const { insertUser } = require('../dbUtils');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  insertUser(req.body);
  res.send('respond with a resource');
});

module.exports = router;
