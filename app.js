require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
app.use(Express.json());
const controllers = require("./controllers");
app.use("/user", controllers.userController);
app.use("/item", controllers.artisanItemController);
dbConnection.authenticate()
    .then(() => dbConnection.sync()) //=> {force: true} {alter: true}
    .then(() => {
        app.listen(3001, () =>{
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error =${err}`);
    })