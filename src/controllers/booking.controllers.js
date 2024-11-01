const catchError = require('../utils/catchError');
const { getAllBooking, createBooking, getOneBooking, updateBooking, removeBooking } = require('../services/booking.services');

const getAll = catchError(async (req, res) => {
  const results = await getAllBooking();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createBooking(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneBooking(id);
 
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeBooking(id);
  
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await updateBooking(req.body, id);
  
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}