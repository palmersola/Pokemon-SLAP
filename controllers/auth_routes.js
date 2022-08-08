const auth_router = require("express").Router();

const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");

const { isLoggedIn } = require("./helpers");
let userId = "";
// let hp = "";
// let attack = "";
// let defense = "";
// let speed = "";

auth_router.post("/register", isLoggedIn, (req, res) => {
  const { user_name, password, water, fire, grass } = req.body;
<<<<<<< HEAD
  console.log(req.body);
=======
  console.log(fire);
  console.log(water);
  console.log(grass);
>>>>>>> d78ca4453813acb7f6cdc6eadb6472a454c7d71f
  if (!user_name || !password) {
    req.session.errors = ["Please check your credentials and try again."];
    return res.redirect("/register");
  }
  if (!water && !fire && !grass) {
<<<<<<< HEAD
    console.log('in error if');
=======
>>>>>>> d78ca4453813acb7f6cdc6eadb6472a454c7d71f
    req.session.errors = ["Please select an option."];
    return res.redirect("/register");
  }
  if (water) {
<<<<<<< HEAD
    console.log('in water if');
    hp = "";
    attack = "";
    defense = "";
    speed = "";
  } else if (fire) {
    console.log('in fire if');
    hp = "";
    attack = "";
    defense = "";
    speed = "";
  } else if (grass) {
    console.log('in grass if');
    hp = "";
    attack = "";
    defense = "";
    speed = "";
=======
    console.log("selecting water stats");

    hp = 44;
    attack = 48;
    defense = 65;
    speed = 43;
  } else if (fire) {
    console.log("selecting fire stats");
    hp = 39;
    attack = 52;
    defense = 43;
    speed = 65;
  } else if (grass) {
    console.log("selecting fire stats");

    hp = 45;
    attack = 49;
    defense = 49;
    speed = 45;
>>>>>>> d78ca4453813acb7f6cdc6eadb6472a454c7d71f
  }

  User.findOne({
    where: {
      user_name
    }
  }).then(user => {
    if (user) {
      req.session.errors = ["A user already exists with that username."];
      return res.redirect("/register");
    }
    User.create({
      user_name: req.body.user_name,
      password: req.body.password
    })
      .then(new_user => {
        userId = new_user.id;
        Character.create({
          hp_stat: hp,
          attack_stat: attack,
          defense_stat: defense,
          speed_stat: speed,
          userId: userId
        });
      })
      .then(new_user => {
        req.session.save(() => {
          req.session.user_id = userId;
          res.redirect("/");
        });
      })
      .catch(err => {
        req.session.errors = err.errors.map(e => e.message);
        res.redirect("/register");
      });
  });
});

auth_router.post("/login", isLoggedIn, (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    req.session.errors = ["Please check your credentials and try again."];
    return res.redirect("/login");
  }
  User.findOne({
    where: {
      user_name
    }
  }).then(async user => {
    //
    if (!user) {
      req.session.errors = ["No user account found matching that username."];
      return res.redirect("/login");
    }

    const pass_is_valid = await user.validPass(password, user.password);
    if (!pass_is_valid) {
      req.session.errors = ["Your password is incorrect"];
      res.redirect("/login");
      console.log("Yerp");
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      res.redirect("/");
    });
  });
});

auth_router.get("/logout", (req, res) => {
  if (!req.session.user_id) return res.redirect("/");

  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = auth_router;
