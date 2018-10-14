const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const { expect, should } = chai;

chai.use(chaiHttp);

describe('GET /bookings', () => {
  it('gets a valid booking by its uid/passenger-id', () => {
    return chai.request(server)
      .get('/bookings?uid=123')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          bookingId: 123,
          lastName: 'Testinen',
          email: 'test@example.com',
        });
      })
      .catch((err) => {
        expect(err).to.be.null;
        throw err;
      });
  });

  it.skip('returns empty with a non-existing uid', () => {

  });

  it('refuses request without a uid', () => {
    return chai.request(server)
      .get('/bookings')
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          success: false,
          message: 'UID is missing'
        });
      })
      .catch((err) => {
        expect(err).to.be.null;
        throw err;
      });
  });
});

describe('GET /bookings/:id', () => {
  it.skip('gets a valid booking by the booking ID', () => {

  });

  it.skip('returns empty with non-existing booking', () => {

  });
})
