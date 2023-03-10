const express  = require('express');
const router = express.Router()
const static = require("static");
const {addPayment } = require("../controller/paymentController");

const auth = require("../middleware/auth")
const stripe = require("stripe")(process.env.SECRET_KEY)



router.route("/paymentHome").get((req,res)=>{
    console.log(process.env.PUBLISHABLE_KEY);
   
    res.render('paymentHome',{
        key: process.env.PUBLISHABLE_KEY,
    })
});

router.route("/payment").post((req,res)=>{
 
    stripe.customers.create({
        email: req.body.stripeEmail,
        source:req.body.stripeToken,
        name:'Tejinder singh',
        address:{
            line1: "155, Mountain velly chandigarh",
            postal_code:'160014',
            city:'chandigarh',
            state:'chandigarh',
            country: 'India'
        }
    }).then((customer)=>{
        return stripe.charges.create({
            amount: 7000,
            description: "Web Dev ptoduct",
            currency: 'USD',
            customer:customer.id
        })
    }).then((charge)=>{
        console.log(charge);
        res.send("success")
    }).catch((err)=>{
        res.send(err);
    })
})


module.exports = router;