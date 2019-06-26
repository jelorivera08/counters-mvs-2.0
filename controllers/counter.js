const express = require('express');
const Counter = require('../models/counter');

const router = express.Router();
const counter = new Counter();

router.get('/', async function(req, res) {
  try {
    let counters = await counter.getAll(req.body.title);
    res.status(200).json(counters);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.post('/', async function(req, res) {
  try {
    let counters = await counter.create(req.body.title);
    res.status(202).json(counters);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.delete('/', async function(req, res) {
  try {
    let counters = await counter.del(req.body.id);
    res.status(202).json(counters);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.post('/inc', async function(req, res) {
  try {
    let counters = await counter.inc(req.body.id);
    res.status(202).json(counters);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.post('/dec', async function(req, res) {
  try {
    let counters = await counter.dec(req.body.id);
    res.status(202).json(counters);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
