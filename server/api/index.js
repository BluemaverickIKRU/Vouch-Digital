const router = require('express').Router();

router.use(
  '/api',
  require('./user/userRoutes'),
  require('./table/tableRoutes')
);

module.exports = router;
