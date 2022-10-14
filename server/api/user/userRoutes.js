const routes = require('express').Router();

const { addAdmin, checkAdmin } = require('./userController');

// Default route
routes.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// User routes

// Add new admin
routes.post('/addNewAdmin', (req, res) => {
  if (req.body.secret === process.env.ADMIN_TOKEN) {
    addAdmin(req.body)
      .then((response) => res.send(response))
      .catch((err) => res.send(err));
  } else {
    res.send({
      message: 'You are not authorized to use this API!',
      statusCode: 404,
    });
  }
});

// Sign-in admin
routes.post('/signIn', (req, res) => {
  checkAdmin(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err));
});

module.exports = routes;
