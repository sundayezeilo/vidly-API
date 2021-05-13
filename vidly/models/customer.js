const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: String,
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    phone: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(customer);
}

function validateCustomerUpdate(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    phone: Joi.string(),
    name: Joi.string().min(3).max(50),
  });
  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
module.exports.validateCustomerUpdate = validateCustomerUpdate;