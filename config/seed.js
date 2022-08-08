const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");
const axios = require('axios');
const seedPokes = [1, 4, 7, 10, 13, 16, 19];

async function pokePuller(){
  for (let i = 0; i < seedPokes.length; i++) {
    let retPokeCall = await pokeApiCaller(i);
    await Pokemon.create({
      pokemon_name: retPokeCall.data.species.name,
      experience: 100,
      hp_stat: retPokeCall.data.stats[0].base_stat,
      attack_stat: retPokeCall.data.stats[1].base_stat,
      defense_stat: retPokeCall.data.stats[2].base_stat,
      speed_stat: retPokeCall.data.stats[5].base_stat,
      sprite: retPokeCall.data.sprites.versions['generation-v']['black-white'].animated.front_default,
    })
  }
}

async function pokeApiCaller(id){
  let apiCall = await axios(`https://pokeapi.co/api/v2/pokemon/${seedPokes[id]}`)
  return apiCall;
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

<<<<<<< HEAD
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
Character.bulkCreate([
  {
    level: 1,
    attack_stat: 40,
    defense_stat: 60,
    speed_stat: 70,
    sprite: "test",
    user_id: 1
  },
  {
    level: 1,
    attack_stat: 70,
    defense_stat: 50,
    speed_stat: 40,
    sprite: "test",
    user_id: 2
  },
  {
    level: 1,
    attack_stat: 80,
    defense_stat: 30,
    speed_stat: 40,
    sprite: "test",
    user_id: 3
  },
  {
    level: 1,
    attack_stat: 40,
    defense_stat: 80,
    speed_stat: 30,
    sprite: "test",
    user_id: 4
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
=======
// Character.bulkCreate([
//   {
//     level: 1,
//     hp_stat: 100,
//     attack_stat: 40,
//     defense_stat: 60,
//     speed_stat: 70,
//     sprite: "test",
//     user_id: 1
//   },
//   {
//     level: 1,
//     hp_stat: 100,
//     attack_stat: 70,
//     defense_stat: 50,
//     speed_stat: 40,
//     sprite: "test",
//     user_id: 2
//   },
//   {
//     level: 1,
//     hp_stat: 100,
//     attack_stat: 80,
//     defense_stat: 30,
//     speed_stat: 40,
//     sprite: "test",
//     user_id: 3
//   },
//   {
//     level: 1,
//     hp_stat: 100,
//     attack_stat: 40,
//     defense_stat: 80,
//     speed_stat: 30,
//     sprite: "test",
//     user_id: 4
//   }
// ]);
>>>>>>> 2a75c17c29ab21e1eabb5bc7d8e0c25aba6b4902

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
