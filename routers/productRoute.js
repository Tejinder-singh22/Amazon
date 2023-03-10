const express  = require('express');
const router = express.Router()
const static = require("static");
const {addProduct, getAllProducts, addDiscount, removeDiscount } = require("../controller/productController");
const cron = require("node-cron") 
const {Authentication, isRole} = require("../middleware/auth");

const auth = require("../middleware/auth")


router.route("/addProduct").post(Authentication,isRole("admin"),Authentication,addProduct);

router.route("/allProducts").get(Authentication,isRole("admin"),getAllProducts); //pagination filter search

//add discount
//@ product category
//@ discount 
router.route("/addDiscount").post(Authentication, isRole("admin"),addDiscount);
     
router.route("/removeDiscount").post(Authentication, isRole("admin"),removeDiscount);


module.exports = router;