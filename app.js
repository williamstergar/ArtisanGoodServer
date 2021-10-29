require('dotenv').config()
const Express = require('express')
const app = Express()
const sequelize = require('./db')

const artisanItem = require('./controllers/artisanitemcontroller')
const user = require('./controllers/usercontroller')

sequelize.sync();

app.use(require('./middleware/headers'))
app.use(express.json())

app.use('/user', user)
app.use('/artisanitem', artisanitem)
 
app.listen(3000, () => {
console.log(`[Server]: App is listening on 3000.`);
});