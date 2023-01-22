const express  = require('express');
const router = express.Router()
const static = require("static");
const registerUser  = require("../controller/registerUser");
const loginUser = require("../controller/loginUser");
const Authentication = require("../middleware/auth");
router.route("/register").get((req,res)=>{
    res.render("register.ejs");
});

 
router.route("/login").post(loginUser);

router.route("/register").post(registerUser);

router.get("/me",Authentication,(req,res)=>{
    res.send("Authentication successfull");
})

// router.route("/login").post(loginUser);

module.exports = router;