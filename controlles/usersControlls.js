const User = require("../models/Users")

const getALlUsers = async (req,res)=>{

    const AllUsers = await User.find().select('-password')

    if(!AllUsers){
     return  res.json({message:"no users"})
    }

  return res.json(AllUsers)

}


module.exports = {getALlUsers}