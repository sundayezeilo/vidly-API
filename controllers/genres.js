const { Genre } = require('../models/genre');

const index = async (req, res) => {
  const genres = await Genre.find().sort('name');
  return res.send(genres);
};

const create = async (req, res) => {
  const genre = new Genre({ name: req.body.name });
  await genre.save();
  return res.status(201).send(genre);
};

const update = async (req, res) => {
  const genre = await Genre.updateOne(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true },
  );

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  return res.send(genre);
};

const destroy = async (req, res) => {
  const genre = await Genre.deleteOne({ _id: req.params.id });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  return res.send(genre);
};

const show = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  return res.send(genre);
};

module.exports = {
  show,
  index,
  create,
  update,
  destroy,
};