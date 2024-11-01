const {user} = require ('../models');

const getAllUser = async () => {
    return await user.findAll();
  }
  
  const createUser = async (body) => {
    return await user.create(body);
  }
  
  const getOneUser = async (id) => {
    return await user.findByPk(id);
  }
  
  const updateUser = async (body, id) => {
    return await user.update(body,
      {where: {id}, returning: true}
    );
  }
  
  const deleteUser = async (id) => {
    return await user.destroy({ where: {id}});
  }
  
  const loginEmailUser = async (email) => {
    return await user.findOne({where: {email}})
  }
  
  module.exports = {
    getAllUser,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
    loginEmailUser
  }