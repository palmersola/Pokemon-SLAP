const { DataTypes, Model } = require("sequelize");
const User = require("./User");
<<<<<<< HEAD

=======
>>>>>>> main
class Character extends Model {}

Character.init(
  {
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hp_stat: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    attack_stat: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
<<<<<<< HEAD
        key: 'id'
      }
    //   defaultValue: 1
=======
        key: "id"
      }
      //   defaultValue: 1
>>>>>>> main
    }
  },
  {
    sequelize: require("../config/connection"),
    // table name
    modelName: "characters"
  }
);

module.exports = Character;
