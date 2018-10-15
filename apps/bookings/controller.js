'use strict';

import getFlights from '../lib/flights';

/**
 * Get the flight details using the given UID / passenger ID.
 * Upon invalid details, an error response is returned.
 * Otherwise the details.
 * @param {object} req the request object
 * @param {object} res the response object
 * @return {object} response
 */
const getByUid = async (req, res) => {
  const booking = await getFlights(req);
  if (booking.length === 0)
    return res.status(200).send({ success: true,
      message: 'No booking found' });

  return res.status(200).json({
    bookingId: booking[0].id || 0,
    lastName: booking[0].lastName || '',
    departure: booking[0].departure || '',
  });
};

/**
 * Get a booking by its bookingId, and return the details
 * @param {object} req the request object
 * @param {object} res the response object
 * @return {object} response
 */
const getByBookingId = async (req, res) => {
  const booking = await getFlights(req);
  if (booking.length === 0)
    return res.status(200).send({ success: true,
      message: 'No booking found' });

  const passenger = {
    firstName: booking[0].firstName,
    lastName: booking[0].lastName,
    email: booking[0].email,
  };

  const flights = booking.map(f => ({
    departure: f.departure,
    arrival: f.arrival,
    departureDate: f.departureDate,
    arrivalDate: f.arrivalDate,
  }));

  return res.status(200).json({
    id: booking[0].id,
    passenger,
    flights,
  });
};

export default {
  getByUid,
  getByBookingId,
  // For testing
  getFlights,
};
