const genConfig = require('../config/webpack.config.js');
const path = require('path');

// module.exports = {
//   module: {
//     rules: config("development").module.rules
//   }
// }
// module.exports = async ({ config }) => console.dir(config.plugins, { depth: null }) || config;

// const path = require('path');
const paths = require('../config/paths');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  // config.module.rules.push(
  //   {
  //   test: /\.scss$/,
  //   loaders: ['style-loader', 'css-loader', 'sass-loader'],
  //   include: paths.globalStyles,
  // }
  config.module.rules = genConfig("development").module.rules;

  // Return the altered config
  return config;
};