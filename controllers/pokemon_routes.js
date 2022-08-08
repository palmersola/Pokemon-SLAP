const pokemon_routes = require('express').Router(); 
const Pokemon = require('../models/Pokemon')


pokemon_routes.get('/', (req, res) => {
    Pokemon.findAll()
    .then(Pokemons =>{
      res.json(Pokemons)
  
    });
  });

module.exports = pokemon_routes