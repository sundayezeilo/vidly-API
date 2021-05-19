const { Types: { ObjectId } } = require('mongoose');

module.exports = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID');
  }
  return next();
};
