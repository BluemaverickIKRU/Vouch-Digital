const mongoose = require('mongoose');

// Database coonection

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, connectionParams)
    .then(() => {
      console.log('Connected to the database ');
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    });
};

module.exports = dbConnect;
