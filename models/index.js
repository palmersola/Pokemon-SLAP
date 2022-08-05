const User = require("./User");
const Character = require("./Character");
const Pokemon = require("./Pokemon");

Character.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

User.hasOne(Character);

module.exports = {
  User,
  Character,
  Pokemon
};
