const request = require('supertest');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const server = require('../../index');

let testServer;
let token;

describe('auth middleware', () => {
  beforeEach(() => {
    testServer = server;
    token = new User().generateAuthToken();
  });

  afterEach(async () => {
    testServer.close();
    await Genre.remove({});
  });

  const exec = () => request(testServer)
    .post('/api/genres')
    .set({ 'x-auth-token': token })
    .send({ name: 'genre1' });

  it('should return 401 if no token is not provided', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'invalidtoken';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(201);
  });
});
