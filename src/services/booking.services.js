const { booking, hotel } = require('../models');

const getAllBooking = async () => {
  return await booking.findAll({ include: [hotel]});
}

const createBooking = async (body) => {
  return await booking.create(body);
}

const getOneBooking = async (id) => {
  return await booking.findByPk(id, {include: [hotel]});
}

const updateBooking = async (body, id) => {
  return await booking.update(
    body,
    {where: { id }, returning: true}
  );
}

const removeBooking = async (id) => {
  return await booking.destroy({where: {id}});
}


module.exports = {
  getAllBooking,
  createBooking,
  getOneBooking,
  updateBooking,
  removeBooking,
}
