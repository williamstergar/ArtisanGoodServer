require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

app.use(Express.json());

//const sequelize = require('./db')

const controllers = require("./controllers");
const artisanItem = require('./controllers/artisanitemcontroller')
//const user = require('./controllers/usercontroller')

//sequelize.sync();

//app.use(require('./middleware/headers'))

app.use('/user', controllers.userController)
app.use('/artisanitem', artisanitem) //what are we stepping into here?

dbConnection.authenticate()
    .then(() => dbConnection.sync()) //=> {force: true} {alter: true}
    .then(() => {
        app.listen(3000, () =>{
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error =${err}`);
    })

