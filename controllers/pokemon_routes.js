const pokemon_routes = require('express').Router(); 
const Pokemon = require('../models/Pokemon')


pokemon_routes.get('/', (req, res) => {
    Pokemon.findAll()
    .then(Pokemons =>{
      res.json(Pokemons)
  
    });
  });


pokemon_routes.post('/:id', (req, res) =>{
    Pokemon.create({
        pokemon_name: req.body.pokemon_name,
        experience: req.body.experience,
        attack_stat: req.body.attack_stat,
        defense_stat: req.body.defense_stat,
        speed_stat: req.body.speed_stat,
        sprite: req.body.sprite,
    }).then(new_pokemon =>{
        res.send(new_pokemon)
    })
})

Sprites.versions.generation-V.black-white.animated.front_default
module.exports = pokemon_routes