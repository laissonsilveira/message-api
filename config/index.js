const { join } = require('path');
const fileName = process.env.NODE_ENV !== 'test' ? 'default' : process.env.NODE_ENV;
module.exports = require(join(__dirname, fileName));