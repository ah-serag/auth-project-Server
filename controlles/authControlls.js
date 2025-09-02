
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const {generateAccesToken ,generateRefreshToken} = require("../utils/jwt")    
const jwt = require("jsonwebtoken")

// register controll
const register = async (req, res) => {

  const { Frist_Name, Last_Name, email, password } = await req.body;

  if (!Frist_Name || !Last_Name || !email || !password) {
    return res.status(400).json({ message: "All faild are required" });
  }

  // check user in database
  const RegUser = await User.findOne({ email });

  if (RegUser) {
    return res.status(400).json({ message: "email already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // ||-->  create user
  const user = await User.create({
    Frist_Name,
    Last_Name,
    email,
    password: hashPassword,
  });


  const accessToken = await generateAccesToken(user._id)

  const refreshToken = await generateRefreshToken(user._id)


 res.cookie("refreshtoken", refreshToken, {
 httpOnly: true, // http protocol
 secure: true, // https 
 sameSite: "None",
 MaxAge:1000 * 60 * 60 * 24*7
 });


 return res.json({
  accessToken: accessToken ,
  name : user.Frist_Name + " " + user.Last_Name ,
  email:user.email
 })



};

const login = async (req,res) =>{

  const {email , password} = await req.body ;
  
  const logUser = await User.findOne({email})
  
  if(!logUser){
   res.json({message : 'user not sign in '} ,{status:401})
  }
 
  const checkPassword = await bcrypt.compare(password ,logUser.password)

  if(!checkPassword){
       res.json({message : 'please whrite succes password'} ,{status:401})
  }

  const accesToken = await generateAccesToken(logUser._id)
  const refreshToken = await generateRefreshToken(logUser._id)
  

 res.cookie("refreshtoken" , refreshToken, {
 httpOnly: true, // http protocol
 secure: true, // https 
 sameSite: "None",//one dominw accses 
 MaxAge: 1000 * 60 * 60 * 24 * 7
 })



  res.json({
    accessToken: accesToken ,
    name:logUser.Frist_Name ,
    email:logUser.email 
  })

}


const refreshToken = async  (req ,res)=>{

  const cookieToken = await req.cookies ;

  if(!cookieToken?.refreshtoken){return res.status(401).json({message:"no refres_hToken"})}
  //
  const refToken = cookieToken.refreshtoken


  jwt.verify(refToken ,process.env.SECRET_KEY_REFREASHTOKEN, async (err,decoded)=>{

    if(err){return res.status(403).json({message:"forbidden"})}
     
     const UserCheck = await User.findById(decoded.userId)


     if(!UserCheck){return res.status(401).json({message:"not found this User"})}


     const AccesToken = await generateAccesToken(decoded.userId)

      return  res.json({
      accessToken: AccesToken ,
       name:UserCheck.Frist_Name ,
     email:UserCheck.email 
    })

  })



}

const logout = (req ,res)=>{

const cookie = req.cookies

if(!cookie?.refreshtoken) {
   return res.sendStatus(204) 

}

  res.clearCookie("refreshtoken", { httpOnly: true, sameSite: "None", secure: true });

return res.json({message:"success logout"})

}

module.exports = {register ,login ,refreshToken ,logout}







