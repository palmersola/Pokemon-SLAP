const session = require("express-session");
const { User, Character } = require("../models");
const { isLoggedIn } = require("./helpers");
const view_router = require("express").Router();

//this will be the main page that will take us to the register/login page
view_router.get("/", (req, res) => {
  if (req.session.user_id) {
    return User.findByPk(req.session.user_id, {
      include: Character
    }).then(user => {
      const charStats = user.dataValues.character.dataValues;
      res.render("index", { charStats: { ...charStats }, user: { ...user } });
    });
  }
  res.render("index"); // needs to be adjusted still
});

// page where new user will sign up for the first time and then input their username and password and choose avatar for the game.
view_router.get("/register", isLoggedIn, (req, res) => {
  res.render("register");
});
// page where user can login again when they revisit the site and continue their session
view_router.get("/login", isLoggedIn, (req, res) => {
  res.render("login");
});
// page where user will adjust their avatar and other settings
view_router.get("/settings", (req, res) => {
  res.render("settings");
});

//this will show the leaderboard across the players
view_router.get("/leaderboard", (req, res) => {
  res.render("leaderboard");
});
// this page will have the actual game
view_router.get("/play", (req, res) => {
  res.render("play");
});

module.exports = view_router;
