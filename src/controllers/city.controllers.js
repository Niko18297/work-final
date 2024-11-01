const catchError = require('../utils/catchError');
const { getAllCity, createCity, updateCity, removeCity } = require('../services/city.services');

const getAll = catchError(async (req, res) => {
  const results = await getAllCity();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createCity(req.body);
  return res.status(201).json(result);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeCity(id);
  
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await updateCity(req.body, id);
  
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  remove,
  update
}