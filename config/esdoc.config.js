const path = require('path');

module.exports = {
  source: path.resolve(__dirname, '../src'),
  destination: path.resolve(__dirname, '../docs/api'),
  includes: ['Account.js', 'DebtSnowball.js', 'Payment.js'],
  exclude: ['*.mock.js'],
  plugins: [
    { name: 'esdoc-standard-plugin' },
    { name: 'esdoc-ecmascript-proposal-plugin', option: { all: true } },
  ],
  package: path.resolve(__dirname, '../package.json'),
};
