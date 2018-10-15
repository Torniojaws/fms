import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /bookings', () => {
  it('returns friendly error if no booking found', () => chai.request(server)
    .get('/bookings')
    .then(res => {
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({
        success: true,
        message: 'No booking found',
      });
    }));

  it('gets a valid booking by its uid/passenger-id', () => {
    chai.request(server)
      .get('/bookings?uid=123')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          bookingId: 123,
          lastName: 'Testinen',
          departure: 'HEL',
        });
      });
  });
});

describe('GET /bookings/:id', () => {
  it('gets a valid booking by the booking ID', () => {
    chai.request(server)
      .get('/bookings/123')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          id: 123,
          passenger: {
            firstName: 'Testi',
            lastName: 'Testinen',
            email: 'test@example.com',
          },
          flights: [
            {
              departure: 'HEL',
              arrival: 'AMS',
              departureDate: '2018-10-16 10:00:00',
              arrivalDate: '2018-10-16 12:00:00', // local
            },
            {
              departure: 'AMS',
              arrival: 'HKG',
              departureDate: '2018-10-16 14:00:00',
              arrivalDate: '2018-10-17 10:00:00',
            },
          ],
        });
      });
  });

  it('returns empty with non-existing booking', () => {
    chai.request(server)
      .get('/bookings/1239876')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          success: true,
          message: 'No booking found',
        });
      });
  });
});
