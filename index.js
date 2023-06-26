const { start } = require("./src/server");
const { sequelize } = require("./src/moduls");
require('dotenv').config()


sequelize.sync().then(() =>{
     start()
}).catch(err => {
     console.log(err);
})