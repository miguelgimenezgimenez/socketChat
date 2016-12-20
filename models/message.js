'use strict';

const mongoose = require('mongoose');




module.exports = mongoose.model('Message', {
  content: String,
  timestamp: String,
  userName: String
});








