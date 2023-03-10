const ErrorHandler = require("../utils/errorHandler");
const jwt  = require('jsonwebtoken');
const userModel =  require("../model/userModel");



const Authentication = async (req,res, next)=>{

const {token}
 = req.cookies;


 if(!token)
 {
    return next(new ErrorHandler("Please login to access resource"),401);
 }

 const decodeData = jwt.verify(token,process.env.JWT_SECRET);

  req.user = await userModel.findById(decodeData.id);  // and also add user as a key to req object
 console.log(req.user);
  next();


}

const isRole = (...roles)=>{

   return  (req, res, next)=>{
       
         if(!roles.includes(req.user.role))
        {   
         next( new ErrorHandler("You are not authorised to access this",403));
        }
    next();
   }

}
 


module.exports = {Authentication, isRole}