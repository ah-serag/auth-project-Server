
const allowedOrgin = require('./allowedOrgin')


const optionCors = {
  origin: function (origin, callback) {
    if (!origin || allowedOrgin.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true 
};


module.exports = optionCors



