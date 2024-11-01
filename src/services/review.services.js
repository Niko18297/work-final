const { review, hotel } = require('../models');

const getAllReview = async () => {
  return await review.findAll({include: [hotel]});
}

const createReview = async (body) => {
  return await review.create(body);
}

const getOneReview = async (id) => {
  return await review.findByPk(id, {include: [hotel]});
}

const updateReview = async (body, id) => {
  return await review.update(
    body,
    {where: {id}, returning: true}
  );
}

const removeReview = async (id) => {
  return await review.destroy({where: {id}});
}


module.exports = {
  getAllReview,
  createReview,
  getOneReview,
  updateReview,
  removeReview,
}
