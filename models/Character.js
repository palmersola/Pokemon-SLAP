const { DataTypes, Model } = require('sequelize');

class Character extends Model { }

Character.init({
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
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
    modelName: 'character'
});