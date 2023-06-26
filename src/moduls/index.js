const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const secretKey = process.env.SECRET

require('dotenv').config()

const postgres_url = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DB_URL;

const sequelize = new Sequelize(postgres_url , {})

const User = sequelize.define('userlab1' , {
     username:{
          type : DataTypes.STRING,
          allowNull : false,
          
     },
     password : {
          type : DataTypes.STRING,
          allowNull : false
     },
     token :{
          type : DataTypes.VIRTUAL
     }
})


User.basicChecker = async function (username, password)  {

     const checkUser = await User.findOne({where :{username}})
     const isValid = await  bcrypt.compare(password , checkUser.password)
     if(isValid){

          const parsToken = jwt.sign({username : checkUser.username , password : checkUser.password} ,secretKey )
          return{
               userInfo : checkUser,
              Token : parsToken
          }
     }
}

User.beareCheacker =async function (token){
     const verfyToken = jwt.verify(token , secretKey)
     const user = await User.findOne({where :{username : verfyToken.username}})
     if(user.username){
          return user
     }
     throw new Error(' no token ') 
}



module.exports = {
     sequelize,
     User
}