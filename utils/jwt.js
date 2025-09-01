
const jwt = require("jsonwebtoken")




const generateAccesToken = async (userId)=>{
  return jwt.sign({userId :userId},process.env.SECRET_KEY_ACCESSTOKEN,{expiresIn:'1d'}) 
} 

const generateRefreshToken = async (userId)=>{
  return jwt.sign({userId :userId},process.env.SECRET_KEY_REFREASHTOKEN,{expiresIn:'7d'}) 
} 



module.exports ={ generateAccesToken, generateRefreshToken }


