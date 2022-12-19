const express = require('express');
const expRoute = express.Router()
const { get, postData } = require("../Controller/Controller")


expRoute.get("/get-data", get)
expRoute.post("/post-data", postData)




module.exports = expRoute