const express = require('express')
const router = express.Router()
const getUsers = require("../controllers/registerController")
// router.get("/",(req,res)=>{
//     res.send("Handling register routes")
// })
router.get("/getProducts")
module.exports = router