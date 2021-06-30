const config = require('config');
const jwt = require('jsonwebtoken');
const {
  Types: { ObjectId },
} = require('mongoose');
const { User } = require('../../../models/user');

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});
