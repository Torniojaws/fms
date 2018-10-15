'use strict';

import query from '../database/controller';

/**
 * Build the WHERE section for the query, depending on query type
 * @param {object} params contains the bookingId, or UID
 * @return {string} the WHERE part for the query, or empty
 */
const getWhere = params => {
  if (params.bookingId) return 'WHERE b.id = ?';
  else if (params.uid) return 'WHERE b.passenger_id = ?';
  return '';
};

/**
 * Get the flight details from the DB by bookingId or UID.
 * If an invalid parameter is given, an empty result is returned
 * @param {object} req containing either the bookingId, or UID
 * @return {array} result of the query, or empty
 */
const getFlights = req => {
  let bookingId;
  let uid;
  if (req.hasOwnProperty('params') && req.params.hasOwnProperty('id')) bookingId = req.params.id;
  if (req.hasOwnProperty('query') && req.query.hasOwnProperty('uid')) uid = req.query.uid;
  const params = { bookingId,
    uid };
  const whereQuery = getWhere(params);
  if (!whereQuery) return [];
  // FIXME: This is just for quick mock testing
  if (bookingId === '1239876') return [];
  const sql = `
    SELECT
      b.id,
      b.firstName,
      b.lastName,
      b.email,
      f.departure,
      f.arrival,
      f.departureDate,
      f.arrivalDate,
    FROM bookings AS b
    JOIN flights AS f ON f.id = b.flight_id
    ${ whereQuery }
    ORDER BY f.departureDate ASC
  `;
  const id = req.params.id ? req.params.id : req.query.uid;
  const parameters = [ id ];

  // TODO: This is the real return
  // return query(sql, parameters);
  // eslint-disable-next-line no-console
  console.log(sql, parameters, query);

  // FIXME: But for quick testing, we return an unconventional mock
  return [
    {
      id: 123,
      firstName: 'Testi',
      lastName: 'Testinen',
      email: 'test@example.com',
      departure: 'HEL',
      arrival: 'AMS',
      departureDate: '2018-10-16 10:00:00',
      arrivalDate: '2018-10-16 12:00:00',
    }, {
      id: 123,
      firstName: 'Testi',
      lastName: 'Testinen',
      email: 'test@example.com',
      departure: 'AMS',
      arrival: 'HKG',
      departureDate: '2018-10-16 14:00:00',
      arrivalDate: '2018-10-17 10:00:00',
    },
  ];
};

export default getFlights;
