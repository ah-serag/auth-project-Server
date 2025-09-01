require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbconn");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//
const optionCors = require("./config/optionCors");
const app = express();
const PORT = process.env.PORT || 3000;
const view404 = path.join(__dirname, "views", "404.html");

connectDB();

app.use(cors(optionCors));
app.use(cookieparser()); //reading cookies
app.use(express.json()); // reading json
app.use("/", express.static(path.join(__dirname, "public"))); //css

// Endpoints
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authroutes"));
app.use("/users", require("./routes/usersroute"));

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(view404);
  } else if (req.accepts("json")) {
    res.json({ message: "404 Erorr" });
  } else {
    res.type("txt").send("404 Erorr");
  }
});

//////////////////////////////////////////////

// once is [connect database frist time ]
mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => {
    console.log(`http//:localhost:${PORT}`);
  });
});

// handle error
mongoose.connection.on("error", (err) => {
  console.log(`faild connect : ${err}`);
});
