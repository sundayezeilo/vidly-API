const moment = require('moment');
const { Rental } = require('../models/rental');

const create = async (req, res) => {
  if (!req.body.customerId) {
    return res.status(400).send('customerId not provided');
  }

  if (!req.body.movieId) {
    return res.status(400).send('movieId not provided');
  }

  const rental = await Rental.findOne({
    'movie._id': req.body.movieId,
    'customer._id': req.body.customerId,
  });

  if (!rental) {
    return res.status(404).send('No rental found');
  }
  if (rental?.dateReturned) {
    return res.status(400).send('Return already processed');
  }

  const dateReturned = moment(new Date());
  rental.dateReturned = dateReturned;
  const rentalDays = dateReturned.diff(rental.dateOut, 'days');
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  rental.save();

  return res.status(200).send();
};

module.exports = create;