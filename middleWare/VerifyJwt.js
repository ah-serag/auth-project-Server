const jwt = require("jsonwebtoken")







const VeryfyJwt = (req , res , next) =>{

 const Headetoken = req.headers['authorization'];
if (!Headetoken?.startsWith('Bearer ')){ return res.status(400).json({message:"no access token"})}

const token = Headetoken.split(" ")[1]
 jwt.verify(token,process.env.SECRET_KEY_ACCESSTOKEN,(err,decoded)=>{
    if(err){return res.status(403).json({message:'forbidden'})} 
   
    req.user = decoded.userId 
    next()
}) 


}



module.exports = VeryfyJwt






