const express = require("express");
const path = require("path");
// engine function for hbs
const { engine } = require("express-handlebars");
const PORT = process.env.PORT || 3333;
// db connection
const db = require("./config/connection");
// session package
const sesh = require("express-session");
// session storage init
const SeqStore = require("connect-session-sequelize")(sesh.Store);

// add env to process obj
require("dotenv").config();

// import routes
const {
  view_routes,
  auth_routes,
  character_routes,
  pokemon_routes
} = require("./controllers");

// create app obj from express
const app = express();

// use front end files
app.use(express.static(path.join("front")));

// set up engine with hbs
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// allow json to be used
app.use(express.json());

//allow form data to be used
app.use(express.urlencoded({ extended: false }));

// session middleware added to server
app.use(
  sesh({
    // secret string to compare to
    secret: process.env.SESSION_SECRET,
    // store sesh data to DB
    store: new SeqStore({ db }),
    // if nothing is saved drop the session
    saveUninitialized: false,
    // prevent sequelize store from destroying idle sesh data
    resave: false,
    cookie: {
      // httpOnly: true
    }
  })
);

// load view routes for root route
app.use("/", view_routes);
// load auth routes
app.use("/auth", auth_routes);

app.use("/characters", character_routes);
// app.use("/pokemon", pokemon_routes);

// sync db tables
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});
