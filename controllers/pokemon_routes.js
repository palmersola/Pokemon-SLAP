const pokemon_routes = require("express").Router();
const { User, Pokemon, Character } = require("../models");
console.log("loaded pokemon_routes");

pokemon_routes.get("/play", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/");
  } else {
    const playerName = await User.findByPk(req.session.user_id);
    const player = await Character.findByPk(req.session.user_id);
    const opponent = await Pokemon.findByPk(player.level);
    console.log(playerName.dataValues.user_name);
    console.log(opponent.dataValues.pokemon_name);
    res.render("play", {
      player,
      opponent,
      playerName
    });
  }
});

//send back next pokemon to fight
pokemon_routes.get("/play/:id", async (req, res) => {
  const nextPoke = await Pokemon.findByPk(req.params.id);
  res.send(nextPoke);
});

pokemon_routes.post("/play/save/:level", async (req, res) => {
  Character.findByPk(req.session.user_id).then(() => {
    Character.update({
      level: req.params.level,
    },
      {
        where: {
        id: req.session.user_id,
        }
      }
    )
  })
});

//send back characters level to set round correctly
pokemon_routes.get("/play/level/round", async (req, res) => {
  console.log(req.body);
  const charLevel = await Character.findByPk(req.session.user_id);
  console.log("CHARACTER OBJ", charLevel);
  res.send(charLevel);
})

pokemon_routes.get("/play/leaderboard", async (req, res) => {
  res.render("leaderboard");
});

module.exports = pokemon_routes;
