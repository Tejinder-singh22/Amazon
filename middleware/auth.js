const ErrorHandler = require("../utils/errorHandler");
const jwt  = require('jsonwebtoken');
const userModel =  require("../model/userModel");



module.exports = async (req,res, next)=>{

const {token}
 = req.cookies;


 if(!token)
 {
    return next(new ErrorHandler("Please login to access resource"),401);
 }

 const decodeData = jwt.verify(token,process.env.JWT_SECRET);

  req.user = await userModel.findById(decodeData._id);

  next();


}