const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: String
})

const Customer = mongoose.model('Customer', customerSchema);

router.get('/' , async(req , res) => {
  const customers = await Customer.find({}).sort('name')
  res.send(customers);
})

router.post('/' , async(req, res)=>{
  const { error, value } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let customer = new Customer(value);

  res.send(await customer.save());
})

router.put('/:id' , async(req , res)=>{
  const { error, value } = validateCustomerUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.updateOne({ _id: req.params.id }, value, { new: true })
  if(!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
})

router.delete('/:id' , async(req, res)=>{
  const customer = await Customer.deleteOne({ _id: req.params.id })
  if(!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
})

function validateCustomer(course) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    phone: Joi.string(),
    name: Joi.string().min(3).max(50).required()
  });
  return schema.validate(course);
}

function validateCustomerUpdate(course) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    phone: Joi.string(),
    name: Joi.string().min(3).max(50)
  });
  return schema.validate(course);
}

module.exports = router;