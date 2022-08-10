const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");
const axios = require("axios");
const bcrypt = require("bcrypt");
const seedPokes = [10, 13, 16, 19, 1, 4, 7, 65, 98, 38, 55, 88, 26];
const connection = require("./connection");
// connection.sync({ force: true });
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
