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
  const { user_name, password, type } = req.body;
  if (!user_name || !password) {
    req.session.errors = ["Please check your credentials and try again."];
    return res.redirect("/register");
  }
  if (!type) {
    req.session.errors = ["Please select an option."];
    return res.redirect("/register");
  }
  if (type === "water") {
    hp = 48;
    attack = 53;
    defense = 72;
    speed = 47;
  } else if (type === "fire") {
    hp = 44;
    attack = 57;
    defense = 47;
    speed = 72;
  } else if (type === "grass") {
    hp = 52;
    attack = 58;
    defense = 58;
    speed = 52;
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
