const pokemon_routes = require("express").Router();
const { User, Pokemon, Character } = require("../models");
console.log("loaded pokemon_routes");

pokemon_routes.get("/play", async (req, res) => {
  const playerName = await User.findByPk(req.session.user_id);
  const player = await Character.findByPk(req.session.user_id);
  const opponent = await Pokemon.findByPk(player.dataValues.level);
  console.log(opponent);
  console.log(player);
  res.render("play", {
    player,
    opponent,
    playerName,
    something: "something from the backend"
  });
});

module.exports = pokemon_routes;
