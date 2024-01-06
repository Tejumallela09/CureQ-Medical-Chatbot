const express = require("express")
const app = express()
const registerRoutes=require("./registerRoutes")
app.use("/register",registerRoutes)
module.exports = app