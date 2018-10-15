import bookings from './apps/bookings/controller';
import express from 'express';

const app = express();

// Endpoints
app.route('/bookings')
  .get(bookings.getByUid);

app.route('/bookings/:id') // NB: This could possibly have its own controller
  .get(bookings.getByBookingId);

export default app;
