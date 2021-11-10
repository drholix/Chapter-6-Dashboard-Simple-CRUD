'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGameBiodata.belongsTo(models.UserGame, {as: 'user_games', foreignKey: 'user_id', sourceKey: 'id' });
    }
  };
  UserGameBiodata.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
    tableName: 'user_game_biodata',
  });
  return UserGameBiodata;
};