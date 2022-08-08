const auth_router = require("express").Router();

const Character = require("../models/Character");
const Pokemon = require("../models/Pokemon");
const User = require("../models/User");

const { isLoggedIn } = require("./helpers");

auth_router.post("/register", isLoggedIn, (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    req.session.errors = ["Please check your credentials and try again."];
    return res.redirect("/register");
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

    User.create(req.body)
      .then(new_user => {
        req.session.save(() => {
          req.session.user_id = new_user.id;
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
