const { DataTypes, Model } = require('sequelize');

class Pokemon extends Model { }

Pokemon.init({
    pokemon_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hp_stat: {
        type: DataTypes.INTEGER,
        allowNull: false 
      },
    attack_stat:{
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
    }
}, {
    sequelize: require('../config/connection'),
    // table name
    modelName: 'pokemon'
});

module.exports = Pokemon; 