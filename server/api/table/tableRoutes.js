const { verifyToken } = require('../authentication/auth');
const { getData, addClient } = require('./tableController');

const router = require('express').Router();

// get all table data from the DB
router.post('/getData', verifyToken, (req, res) => {
  if (req.body.error) {
    res.send({
      message: req.body.error.message,
      statusCode: 401,
      err: req.body.error.err,
    });
  } else {
    getData()
      .then((response) => {
        res.send(response);
      })
      .catch((err) => res.send(err));
  }
});

// Add client to the DB
router.post('/addClient', verifyToken, (req, res) => {
  if (req.body.error) {
    res.send({ message: req.body.error.message, statusCode: 401 });
  } else {
    addClient(req.body)
      .then((response) => res.send(response))
      .catch((err) => res.send(err));
  }
});

module.exports = router;
