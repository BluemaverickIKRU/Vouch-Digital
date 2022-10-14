const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyMail: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
});

const tableModel = mongoose.model('table', tableSchema);

module.exports = tableModel;
