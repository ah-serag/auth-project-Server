const mongoose = require("mongoose") ;



 const connectDB = async function (){

mongoose.connect(process.env.DATABASE_URL).then((res)=>{
 return res
}).catch((err)=>{
    console.log("faild connect")
    return err
})

}


module.exports = connectDB
