const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");
const axios = require("axios");
const bcrypt = require("bcrypt");
const seedPokes = [1, 4, 7, 10, 13, 16, 19];
const connection = require("./connection");
connection.sync({ force: true }).then(() => {
  async function pokePuller() {
    for (let i = 0; i < seedPokes.length; i++) {
      let retPokeCall = await pokeApiCaller(i);
      await Pokemon.create({
        pokemon_name: retPokeCall.data.species.name,
        experience: 100,
        hp_stat: retPokeCall.data.stats[0].base_stat,
        attack_stat: retPokeCall.data.stats[1].base_stat,
        defense_stat: retPokeCall.data.stats[2].base_stat,
        speed_stat: retPokeCall.data.stats[5].base_stat,
        sprite:
          retPokeCall.data.sprites.versions["generation-v"]["black-white"]
            .animated.front_default
      });
    }
  }

  async function pokeApiCaller(id) {
    let apiCall = await axios(
      `https://pokeapi.co/api/v2/pokemon/${seedPokes[id]}`
    );
    return apiCall;
  }
  pokePuller();

  User.bulkCreate([
    {
      user_name: "Derek",
      password: bcrypt.hashSync("testing", 10)
    },
    {
      user_name: "Mustafa",
      password: bcrypt.hashSync("testing", 10)
    },
    {
      user_name: "Andy",
      password: bcrypt.hashSync("testing", 10)
    },
    {
      user_name: "Palmer",
      password: bcrypt.hashSync("testing", 10)
    }
  ]);

  Character.bulkCreate([
    {
      level: 1,
      hp_stat: 100,
      attack_stat: 40,
      defense_stat: 60,
      speed_stat: 70,
      sprite: "test",
      userId: 1
    },
    {
      level: 1,
      hp_stat: 100,
      attack_stat: 70,
      defense_stat: 50,
      speed_stat: 40,
      sprite: "test",
      userId: 2
    },
    {
      level: 1,
      hp_stat: 100,
      attack_stat: 80,
      defense_stat: 30,
      speed_stat: 40,
      sprite: "test",
      userId: 3
    },
    {
      level: 1,
      hp_stat: 100,
      attack_stat: 40,
      defense_stat: 80,
      speed_stat: 30,
      sprite: "ballguy.png",
      userId: 4
    }
  ]);
});
