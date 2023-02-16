var express = require('express');
const { insertUser, getUserByEmail, updateUser, getUsersForView } = require('../dbUtils');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  insertUser(req.body)
  .then(() => res.sendStatus(200))
  .catch(err => res.sendStatus(500));
});

router.get('/view', function(req, res) {
  console.log('view users');
  getUsersForView()
  .then(usersview => res.send(usersview))
  .catch(err => res.sendStatus(500));
});

router.post('/byEmail', function(req, res, next) {
  console.log(req.body);
  getUserByEmail(req.body.email)
  .then(userData => res.send(userData))
  .catch(err => console.log(err));
});

router.post('/update', function(req, res, next) {
  console.log(req.body);
  updateUser(req.body)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err));
});

module.exports = router;
