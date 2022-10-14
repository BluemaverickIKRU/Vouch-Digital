const tableModel = require('./tableSchema');

// Get all table data from the DB
const getData = () => {
  return new Promise((resolve, reject) => {
    tableModel.find({}, (err, data) => {
      if (err)
        reject({
          message: 'Error occured while fetching table data from DB!',
          statusCode: 500,
          err,
        });
      resolve({
        message: 'Successfully fetched the table data from the DB!',
        statusCode: 200,
        data,
      });
    });
  });
};

// Add new client to the DB
const addClient = (clientInfo) => {
  return new Promise((resolve, reject) => {
    const client = new tableModel();
    client.companyName = clientInfo.companyName;
    client.companyMail = clientInfo.companyMail;
    client.phoneNumber = clientInfo.phoneNumber;
    client.contactPerson = clientInfo.contactPerson;
    client.save((err, data) => {
      if (err)
        reject({
          message: 'Error occured while adding the client to DB!',
          statusCode: 500,
          err,
        });
      resolve({
        message: 'Successfully added the client to DB!',
        statusCode: 200,
      });
    });
  });
};

module.exports = {
  getData,
  addClient,
};
