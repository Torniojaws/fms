const express = require('express');
const app = express();

// The endpoint implementations
const bookings = require('./apps/bookings/controller');

// Endpoints
app.route('/bookings')
  .get(bookings.getByUid);

app.route('/bookings/:id')  // NB: This could possibly have its own controller
  .get(bookings.getByBookingId);

module.exports = app;
