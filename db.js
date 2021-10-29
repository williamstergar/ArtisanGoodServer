const Sequelize = require('sequelize')
const sequelize = new Sequelize('artisangoods', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log('Connect to artisangoods postgreSQL database')
    },
    function(err){
        console.log(err)
    }
)

module.exports = sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Password@localhost:5432/ArtisanGoodServer");

module.exports = sequelize;
