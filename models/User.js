const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
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
    }
  },
  {
    sequelize: require("../config/connection"),
    // table name
    modelName: "user",

    // hooks: {
    //   async beforeCreate(user) {
    //     const encrypt_pass = await bcrypt.hash(user.password, 10);

    //     user.password = encrypt_pass;
    //   }
    // }
  }
);

User.prototype.validPass = async function(pass, stored_pass) {
  return await bcrypt.compare(pass, stored_pass);
};

module.exports = User;
