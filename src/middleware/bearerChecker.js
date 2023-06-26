const { User } = require("../moduls");


module.exports = (req , res , next) =>{
     if(!req.headers.authorization){
          next()
     }
     const token = req.headers.authorization.split(" ").pop()
     User.beareCheacker(token).then(data =>{
          req.data = data
          next()
     }).catch(err => console.log(err))

}