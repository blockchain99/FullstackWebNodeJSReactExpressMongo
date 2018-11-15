//keys.js - figure out wha set of credentials to return
//NODE_ENV tells whether it is production or development
if (process.env.NODE_ENV === 'productions') {
  // we are in production -retun the prod set of keys
  module.exports = require('./prod');
} else {
  //dev - return the dev keys!!
  module.exports = require('./dev');
}
