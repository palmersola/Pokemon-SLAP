const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');


class Character extends Model { }

Character.init({
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 3
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 6
        }
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
    modelName: 'character',

    hooks: {
        async beforeCreate(player) {
            const encrypt_pass = await bcrypt.hash(player.password, 10);

            player.password = encrypt_pass
        }
    }
});

Character.prototype.validPass = async function(pass, stored_pass) {

    return await bcrypt.compare(pass, stored_pass);
}

module.exports = Character;