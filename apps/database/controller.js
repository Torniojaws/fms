'use strict';

/**
 * Run a parametrized query to our current DB
 * @param {string} queryString Eg. SELECT * FROM table WHERE id=? LIMIT ?, 5
 * @param {array} parameters The parameters to use in the query: [userId, start]
 * @return {array} results of the DB query
 */
const query = (queryString, parameters) => {
  return connection.query(queryString, parameters);
};

module.exports = {
  query,
};
