const { getAll, create, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerCity = express.Router();

routerCity.route('/')
  .get(getAll)
  .post(verifyJWT, create);

routerCity.route('/:id')
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerCity;