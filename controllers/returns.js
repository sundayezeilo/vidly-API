const Joi = require('joi');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');

function validateReturn(genre) {
  const schema = Joi.object({
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
  });

  return schema.validate(genre);
}

const create = async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) {
    return res.status(404).send('No rental found');
  }
  if (rental?.dateReturned) {
    return res.status(400).send('Return already processed');
  }

  rental.return();

  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id }, {
      $inc: { numberInStock: 1 },
    },
  );

  return res.send(rental);
};

module.exports = { create, validateReturn };