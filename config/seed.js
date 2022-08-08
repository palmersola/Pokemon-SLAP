<<<<<<< HEAD
<<<<<<< Updated upstream
const router = require('express').Router();
const Character = require('../models/Character');
const Pokemon = require('../models/Pokemon');
const User = require('../models/User');
=======
>>>>>>> main

const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const connection = require("./connection");
connection.sync({ force: true }).then(() => {
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
      attack_stat: 40,
      defense_stat: 60,
      speed_stat: 70,
      sprite: "test",
      userId: 1
    },
    {
      level: 1,
      attack_stat: 70,
      defense_stat: 50,
      speed_stat: 40,
      sprite: "test",
      userId: 2
    },
    {
      level: 1,
      attack_stat: 80,
      defense_stat: 30,
      speed_stat: 40,
      sprite: "test",
      userId: 3
    },
    {
      level: 1,
      attack_stat: 40,
      defense_stat: 80,
      speed_stat: 30,
      sprite: "test",
      userId: 4
    }
  ]);

  Pokemon.bulkCreate([
    {
      pokemon_name: "Bulbasaur",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Charmander",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Squirtle",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Jigglypuff",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Celfairy",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Pikachu",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Weedle",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Caterpie",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },

    {
      pokemon_name: "Rattata",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Ekans",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    },
    {
      pokemon_name: "Sandshrew",
      experience: 100,
      attack_stat: 50,
      defense_stat: 50,
      speed_stat: 50,
      sprite: "test"
    }
  ]);
});
]);

<<<<<<< HEAD
Character.bulkCreate([
    {
        level: 1,
        attack_stat: 40,
        defense_stat: 60,
        speed_stat: 70,
        sprite: 'test',
        user_id: 1,
    },
    {
        level: 1,
        attack_stat: 70,
        defense_stat: 50,
        speed_stat: 40,
        sprite: 'test',
        user_id: 2,
    },
    {
        level: 1,
        attack_stat: 80,
        defense_stat: 30,
        speed_stat: 40,
        sprite: 'test',
        user_id: 3,
    },
    {
        level: 1,
        attack_stat: 40,
        defense_stat: 80,
        speed_stat: 30,
        sprite: 'test',
        user_id: 4,
    },
]);
=======
const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");
const axios = require('axios');
const seedPokes = [1, 4, 7, 10, 14, 17, 20];

console.log('Outside the get');

async function pokePuller(){
  const resPokePuller = await axios(`https://pokeapi.co/api/v2/pokemon/${seedPokes[i]}`)
  console.log(resPokePuller.data.sprites.versions['generation-v']['black-white'].animated.front_default);
}
pokePuller();

// User.bulkCreate([
//   {
//     user_name: "Derek",
//     password: "testing"
//   },
//   {
//     user_name: "Mustafa",
//     password: "testing"
//   },
//   {
//     user_name: "Andy",
//     password: "testing"
//   },
//   {
//     user_name: "Palmer",
//     password: "testing"
//   }
// ]);

// Character.bulkCreate([
//   {
//     level: 1,
//     attack_stat: 40,
//     defense_stat: 60,
//     speed_stat: 70,
//     sprite: "test",
//     user_id: 1
//   },
//   {
//     level: 1,
//     attack_stat: 70,
//     defense_stat: 50,
//     speed_stat: 40,
//     sprite: "test",
//     user_id: 2
//   },
//   {
//     level: 1,
//     attack_stat: 80,
//     defense_stat: 30,
//     speed_stat: 40,
//     sprite: "test",
//     user_id: 3
//   },
//   {
//     level: 1,
//     attack_stat: 40,
//     defense_stat: 80,
//     speed_stat: 30,
//     sprite: "test",
//     user_id: 4
//   }
// ]);
>>>>>>> Stashed changes

// Pokemon.bulkCreate([
//   {
//     pokemon_name: "Bulbasaur",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Charmander",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Squirtle",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Jigglypuff",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Celfairy",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Pikachu",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Weedle",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Caterpie",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Rattata",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Ekans",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   },
//   {
//     pokemon_name: "Sandshrew",
//     experience: 100,
//     attack_stat: 50,
//     defense_stat: 50,
//     speed_stat: 50,
//     sprite: "test"
//   }
// ]);
=======
>>>>>>> main
