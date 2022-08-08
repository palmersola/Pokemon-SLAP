const User = require("./User");
const Character = require("./Character");
const Pokemon = require("./Pokemon");

User.hasOne(Character);
Character.belongsTo(User);

module.exports = {
  User,
  Character,
  Pokemon
};
