const auth_router = require("express").Router();
const Character = require("../models/Character");
const { isLoggedIn } = require("./helpers");

auth_router.post("/register", isLoggedIn, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.session.errors = ["Please check your credentials and try again."];
    return res.redirect("/register");
  }

  Character.findOne({
    where: {
      username
    }
  }).then(user => {
    if (user) {
      req.session.errors = ["A user already exists with that username."];
      return res.redirect("/register");
    }

    Character.create(req.body)
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
  const { username, password } = req.body;

  if (!username || !password) {
    req.session.errors = ["Please check your credentials and try again."];
    return res.redirect("/login");
  }

  Character.findOne({
    where: {
      username
    }
  }).then(async user => {
    //
    if (!user) {
      req.session.errors = ["No user account found matching that username."];
      return res.redirect("/login");
    }

    const pass_is_valid = await user.validatePass(password, user.password);
    if (!pass_is_valid) {
      req.session.errors = ["Your password is incorrect"];
      res.redirect("/login");
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
