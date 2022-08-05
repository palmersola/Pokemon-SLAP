require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        dialectOptions: {
          decimalNumbers: true
        }
      }
    );

module.exports = sequelize;

// const { Sequelize } = require('sequelize'); // pull in the constructor


// // Set up our connection to the mysql server locally or on the cloud(production)

// const connection = new Sequelize( // creates new Sequelize connection object
//   'poke_slap', // database name
//   'root', // username
//   'Lightsaber11@@', // password
//   { // options object
//     host: 'localhost',
//     dialect: 'mysql', // database type
//     logging: true
//   }
// );

// module.exports = connection; // export the connection object