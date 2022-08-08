const { DataTypes, Model } = require("sequelize");

class Pokemon extends Model {}

Pokemon.init(
  {
    pokemon_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hp_stat: {
<<<<<<< HEAD
        type: DataTypes.INTEGER,
        allowNull: false 
      },
    attack_stat:{
        type: DataTypes.INTEGER,
        allowNull: false
=======
      type: DataTypes.INTEGER,
      allowNull: false
    },

    attack_stat: {
      type: DataTypes.INTEGER,
      allowNull: false
>>>>>>> 0e519efd106912fb4631c060c8f49a3739cddb87
    },
    defense_stat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed_stat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprite: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: require("../config/connection"),
    // table name
    modelName: "pokemon"
  }
);

module.exports = Pokemon;
