const request = require('supertest');
const { Types: { ObjectId } } = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);
      const res = await request(server).get('/api/genres');
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

      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      const id = new ObjectId(1);
      const res = await request(server).get(`/api/genres/${id}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;
    const exec = async () => request(server)
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

  describe('PUT /:id', () => {
    let token;
    let newName;
    let genreId;
    const exec = async () => request(server)
      .put(`/api/genres/${genreId}`)
      .set('x-auth-token', token)
      .send({ name: newName });

    beforeEach(async () => {
      const genre = new Genre({ name: 'genre' });
      await genre.save();

      token = new User().generateAuthToken();
      newName = 'newgenre';
      genreId = genre._id;
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 404 if genre id is not valid', async () => {
      genreId = 1234;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if genre is less tahn 5 characters', async () => {
      newName = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      newName = Array(55).join('a');
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should update the genre if it is valid', async () => {
      const res = await exec();
      const genre = await Genre.findOne({ name: 'newgenre' });
      expect(res.status).toBe(200);
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is updated', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ n: 1, nModified: 1, ok: 1 });
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let genreId;
    const exec = async () => request(server)
      .delete(`/api/genres/${genreId}`)
      .set('x-auth-token', token)
      .send();

    beforeEach(async () => {
      const genre = new Genre({ name: 'genre' });
      await genre.save();
      genreId = genre._id;
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 403 if user is not an admin', async () => {
      const user = new User({ isAdmin: false });
      token = user.generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });

    describe('when user is admin', () => {
      let user;
      beforeEach(async () => {
        user = new User({ isAdmin: true });
        token = user.generateAuthToken();
      });
      it('should return 404 if genre id is not valid', async () => {
        genreId = 1234;
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it('should delete the given genre if it is valid', async () => {
        const res = await exec();
        const genre = await Genre.findOne({ name: 'genre' });
        expect(res.status).toBe(200);
        expect(genre).toBeNull();
      });

      it('should return the genre if it is updated', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ n: 1, deletedCount: 1, ok: 1 });
      });
    });
  });
});
