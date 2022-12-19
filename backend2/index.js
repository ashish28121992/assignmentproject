const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const upload = require('express-fileupload')

// console.log("env", dotenv)
app.use(cors());
app.use(upload());
app.use(express.json());
// const { con } = require("./Modal/Modal");

const expRoute = require("./Routes/Routes");

app.use("/api", expRoute);

// app.post("/*", (req, res) => {
//     //   console.log(req.file);
//       res.send({status:400,response:"wrong route" });
//     });
app.listen(5000, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("listening on port :5000");
  }
});
