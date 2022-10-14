const jwt = require('jsonwebtoken');

// Generate JWT function
const getToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.SECRET, { expiresIn: '3000s' });
};

// Verify the JWT
const verifyToken = (req, res, next) => {
  jwt.verify(req.body.token, process.env.SECRET, (err, user) => {
    if (err)
      req.body.error = {
        message: 'Token is expired. Login again!',
        statusCode: 401,
        err,
      };
    next();
  });
};

module.exports = {
  getToken,
  verifyToken,
};
