'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      city.hasMany(models.hotel)
    }
  }
  city.init({
    name: {
      type: DataTypes.STRING,
      allownull: false
    },
    country: {
      type: DataTypes.STRING,
      allownull: false
    },
    countryId: {
      type: DataTypes.STRING,
      allownull: false
    },
  }, {
    sequelize,
    modelName: 'city',
  });
  return city;
};