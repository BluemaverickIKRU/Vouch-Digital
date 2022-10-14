const userModel = require('./userSchema');
const bcrypt = require('bcrypt');
const { getToken } = require('../authentication/auth');

// Add new admin
const addAdmin = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    const newAdmin = new userModel();
    newAdmin.userName = userInfo.userName;
    // Passowrd is being crypted
    newAdmin.password = await bcrypt.hash(userInfo.password, 10);
    newAdmin.userMail = userInfo.userMail;
    newAdmin.save((err, data) => {
      if (err) {
        if (err.code === 11000) {
          // If the error is due to duplicate useername or usermail
          reject({
            message: `Error occured due to ${Object.keys(
              err.keyValue
            )} : ${Object.values(err.keyValue)} is already exisiting!`,
            statusCode: 500,
          });
        } else {
          // Any error other than the dulplicate error
          reject({
            message: 'Error occured while adding new admin!',
            err,
            statusCode: 500,
          });
        }
      }
      //   If adding admin is successfull
      resolve({
        message: 'Successfull added the new admin!',
        data,
        statusCode: 200,
      });
    });
  });
};

// Validating admin
const checkAdmin = (userInfo) => {
  return new Promise((resolve, reject) => {
    // Getting admin from the DB
    userModel.findOne({ userName: userInfo.username }, (err, data) => {
      if (err)
        //   Any error occurs here will be rejected
        reject({
          message: 'Error occured while fetching user data!',
          statusCode: 500,
        });
      if (data !== null) {
        // If admin is existing check if password matches
        bcrypt.compare(userInfo.password, data.password, (err, pass) => {
          if (err)
            // Any error occurs, reject the response
            reject({
              message: 'Error occured while comparing password!',
              err,
              statusCode: 500,
            });
          if (pass) {
            // If the password matches
            const token = getToken(userInfo);
            resolve({
              message: 'Admin is authenticated!',
              statusCode: 200,
              token,
              data,
            });
          } else {
            // if the password does not mactch
            resolve({ message: 'Password is incorrect!', statusCode: 404 });
          }
        });
      } else {
        // If admin not exist
        resolve({
          message: 'No admin exist with the given credentials!',
          data,
          statusCode: 404,
        });
      }
    });
  });
};

module.exports = {
  addAdmin,
  checkAdmin,
};
