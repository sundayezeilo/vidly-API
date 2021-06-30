const Joi = require('joi');
const objectId = require('joi-objectid')(Joi);

module.exports = () => {
  Joi.objectId = objectId;
};
