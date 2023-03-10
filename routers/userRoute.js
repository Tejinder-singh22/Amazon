const express  = require('express');
const router = express.Router()
const static = require("static");
const {registerUser, loginUser, logoutUser, getAllUsers, updateUser } = require("../controller/userController");


const {Authentication, isRole} = require("../middleware/auth");

router.route("/register").get((req,res)=>{
    res.render("register.ejs");
});
router.route("/register").post(registerUser);

router.route("/login").get((req,res)=>{
    res.render("login.ejs");
});
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);


router.get("/dashboard",Authentication,isRole("admin"),(req,res)=>{
    res.render("dashboard.ejs");
})

router.route("/allUsers").get(Authentication,isRole("admin"),getAllUsers);

router.route("/updateUser").put(Authentication,updateUser);

module.exports = router;