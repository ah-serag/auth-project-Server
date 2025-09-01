const mongoose = require('mongoose')



const UserShema = new mongoose.Schema(
 {
 Frist_Name : {type:String , require: true},
 Last_Name : {type:String , require: true} ,
 email : {type:String , require:true ,uniqe:true},
 password:{type:String , require:true}
},
{timestamps:true}
)



module.exports = mongoose.model("User",UserShema) ;


