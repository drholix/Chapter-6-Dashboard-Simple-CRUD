'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGame.hasOne(models.UserGameBiodata, {as: 'user_game_biodata', foreignKey: 'user_id', sourceKey: 'id' });
      UserGame.hasMany(models.UserGameHistory, {as: 'user_game_histories', foreignKey: 'user_id', sourceKey: 'id' });
    }
  };
  UserGame.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGame',
    tableName: 'user_games',
  });
  return UserGame;
};