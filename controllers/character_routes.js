const router = require("express").Router();
const { Character, User } = require("../models/");

// The `/api/Characters` endpoint

router.get("/", (req, res) => {
  // find all Characters
  // be sure to include its associated Product data
  Character.findAll({
    include: User
  }).then(all_Characters => {
    res.json(all_Characters);
  });
});

router.get("/:id", (req, res) => {
  // find a single Character by its `id`
  // be sure to include its associated Product data
  Character.findAll({
    where: {
      id: req.params.id
    },
    include: User
  }).then(Character => {
    res.json(Character);
  });
});

router.post("/", (req, res) => {
  // create a new Character
  Character.create({
    level: req.body.level,
    attack_stat: req.body.attack,
    defense_stat: req.body.defense,
    speed_stat: req.body.speed,
    sprite: req.body.sprite,
    user_id: req.body.user_id
  }).then(new_Character => {
    res.json(new_Character);
  });
});

router.put("/:id", (req, res) => {
  // update a Character's name by its `id` value
  Character.update(
    {
      level: req.body.level,
      attack_stat: req.body.attack,
      defense_stat: req.body.defense,
      speed_stat: req.body.speed,
      sprite: req.body.sprite,
      user_id: req.body.user_id
    },
    {
      where: {
        id: req.params.id,
        Character_id: req.params.id
      }
    }
  ).then(updated_Character => {
    res.json(updated_Character);
  });
});

router.delete("/:id", (req, res) => {
  // delete on Character by its `id` value
  Character.destroy({
    where: {
      id: req.params.id
    }
  });
});

module.exports = router;
