const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { resolve } = require('path');

module.exports = () =>
  open({
    filename: resolve(__dirname, 'database.sqlite'),
    driver: sqlite3.Database,
  });
