const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'security',
  user: 'root',
  password: 'amaenikoertiga2103A@',
  multipleStatements: true
})

module.exports = pool;