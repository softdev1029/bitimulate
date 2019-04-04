const config = require('../config/webpack.config.js');
const path = require('path');

module.exports = {
  module: {
    rules: config("development").module.rules
  }
}