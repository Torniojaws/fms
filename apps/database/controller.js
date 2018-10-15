'use strict';

import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'fms',
  password: 'fmstest',
});

// const getConnString = () => `mysql://fms:fmstest@localhost/fms?charset=utf8_general_ci&timezone=+0300`;

/**
 * Run a parametrized query to our current DB
 * @param {string} queryString Eg. SELECT * FROM table WHERE id=? LIMIT ?, 5
 * @param {array} parameters The parameters to use in the query: [userId, start]
 * @return {array} results of the DB query
 */
const query = (queryString, parameters) => {
  pool.getConnection((err, connection) => {
    connection.query({ sql: queryString,
      timeout: 10,
      values: parameters },
    (err, rows) => {
      if (err) throw err;
      return rows;
    });
  });
};

export default {
  query,
};
