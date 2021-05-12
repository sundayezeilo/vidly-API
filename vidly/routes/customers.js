const express = require('express');

const {
  Customer,
  validateCustomer,
  validateCustomerUpdate,
} = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find({}).sort('name');
  return res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id });
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  return res.send(customer);
});

router.post('/', async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer(value);
  return res.send(await customer.save());
});

router.put('/:id', async (req, res) => {
  const { error, value } = validateCustomerUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.updateOne({ _id: req.params.id }, value, { new: true });
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  return res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.deleteOne({ _id: req.params.id });
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  return res.send(customer);
});

module.exports = router;