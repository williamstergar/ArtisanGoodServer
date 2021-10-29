const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Password@localhost:5432/ArtisanGoodServer");

module.exports = sequelize;