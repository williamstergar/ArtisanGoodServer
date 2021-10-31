const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:(YOURPGADMINPASSWORD)@localhost:5432/ArtisanGoodServer");

module.exports = sequelize;