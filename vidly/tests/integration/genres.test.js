const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const server = require('../../index');

let testServer;

describe('/api/genres', () => {
  beforeEach(() => {
    testServer = server;
  });

  afterEach(async () => {
    testServer.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);
      const res = await request(testServer).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre' });
      await genre.save();

      const res = await request(testServer).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(testServer).get('/api/genres/1234');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;
    const exec = async () => request(testServer)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name });

    beforeEach(() => {
      name = 'genre1';
      token = new User().generateAuthToken();
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less tahn 5 characters', async () => {
      name = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if genre is more than 50 characters', async () => {
      name = Array(55).join('a');
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      const res = await exec();
      const genre = await Genre.findOne({ name: 'genre1' });
      expect(res.status).toBe(201);
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
