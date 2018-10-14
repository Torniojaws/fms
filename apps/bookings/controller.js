'use strict';

const { is } = require('ramda');
const { query } = require('../database/controller');

/**
 * Get the flight details using the given UID / passenger ID.
 * Upon invalid details, an error response is returned.
 * Otherwise the details.
 */
const getByUid = async (req, res) => {
  if (!req.query || !req.query.uid || is(Number, req.query.uid)) {
    res.status(400);
    res.send({
      success: false,
      message: 'UID is missing',
    });
    return;
  }

  const uid = req.query.uid;
  const booking = await getFlights({ uid });
  const result = {
    bookingId: booking.id,
    lastName: booking.lastName,
    firstName: booking.firstName,
  };

  res.status(200);
  res.json(result);
};

/**
 * Build the WHERE section for the query, depending on query type
 * @param {object} params contains the bookingId, or UID
 * @return {string} the WHERE part for the query, or empty
 */
const getWhere = params => {
  if (params.bookingId) return 'WHERE b.id = ?';
  else if (params.uid) return 'WHERE b.passenger_id = ?';
  return '';
}

/**
 * Get the flight details from the DB by bookingId or UID.
 * If an invalid parameter is given, an empty result is returned
 * @param {object} params containing either the bookingId, or UID
 * @return {array} result of the query, or empty
 */
const getFlights = params => {
  const whereQuery = getWhere(params);
  if (!whereQuery) return [];
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
    ${whereQuery}
    ORDER BY f.departureDate ASC
  `;
  const id = params.bookingId ? params.bookingId : params.uid;
  const parameters = [id];
  return query(query, parameters);
};

/**
 * Get a booking by its bookingId, and return the details
 * @param {int} bookingId is the ID of the booking
 * @return {object} the result for the request
 */
const getByBookingId = async (bookingId) => {
  const booking = await getFlights({ bookingId });
  const flights = booking.map(f => ({
    departure: f.departure,
    arrival: f.arrival,
    departureDate: f.departureDate,
    arrivalDate: f.arrivalDate,
  }));
  return {
    id: booking.id,
    passenger: {
      firstName: booking[0].firstName,
      lastName: booking[0].lastName,
      email: booking[0].email,
    },
    flights,
  }
};

module.exports = {
  getByUid,
  getByBookingId,
};
