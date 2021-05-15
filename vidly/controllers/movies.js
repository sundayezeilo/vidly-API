const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');

const index = async (req, res) => {
  const movies = await Movie.find().sort('name');
  return res.send(movies);
};

const create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  return res.send(movie);
};

const update = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.updateOne({ _id: req.params.id },
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  return res.send(movie);
};

const show = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  return res.send(movie);
};

const destroy = async (req, res) => {
  const movie = await Movie.deleteOne({ _id: req.params.id });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  return res.send(movie);
};

module.exports = {
  show,
  index,
  create,
  update,
  destroy,
};