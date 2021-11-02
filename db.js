const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:1b3ebbef6db74c198c43b947b88c021f@localhost:5432/ArtisanGoodServer");



// const sequelize = new Sequelize(process.env.DATABASE_URL, { 
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// })

module.exports = sequelize;