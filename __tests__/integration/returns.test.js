const { Types: { ObjectId } } = require('mongoose');
const moment = require('moment');
const request = require('supertest');
const { User } = require('../../models/user');
const { Rental } = require('../../models/rental');
const { Movie } = require('../../models/movie');

describe('/api/returns', () => {
  let server;
  let movieId;
  let customerId;
  let rental;
  let token;
  let movie;

  const exec = () => request(server)
    .post('/api/returns')
    .set('x-auth-token', token)
    .send({ customerId, movieId });

  beforeEach(async () => {
    server = require('../../index');

    movieId = new ObjectId();
    customerId = new ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: { name: '12345' },
      numberInStock: 10,
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },

      movie: {
        _id: movieId,
        title: 'movie title',
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  it('should return 401 if customer is not logged in', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if customerId is not provided', async () => {
    customerId = '';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if moviesId is not provided', async () => {
    movieId = '';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 404 if no rental found for the customer/movie', async () => {
    await Rental.deleteMany({});

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 400 if return is already processed', async () => {
    rental.dateReturned = Date.now();
    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if a valid request', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it('should set returnDate if a valid request', async () => {
    await exec();

    const rentalInDb = await Rental.findOne({ _id: rental._id });

    const diff = new Date() - rentalInDb.dateReturned;

    expect(diff).toBeLessThan(10 * 1000);
  });

  it('should set the rentalFee if input is valid', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();

    await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it('should increase the movie stock', async () => {
    await exec();

    const movieInDb = await Movie.findOne({ _id: movieId });

    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });

  it('should return the rental if input is valid', async () => {
    const res = await exec();
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(['_id', 'customer', 'movie', 'dateOut', '__v', 'dateReturned', 'rentalFee']),
    );
  });
});
