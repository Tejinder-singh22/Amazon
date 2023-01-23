const userModel =  require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");


const loginUser = async (req,res,next)=>{

   
    console.log(req.body );
  
    const {email, password} = req.body;

    if(!email || !password)
    {
       return next(new ErrorHandler("Enter Email or Password",401));
    }
 
    const user = await userModel.findOne({email: email});

    if(!user)
    {
       return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const result = await user.comparePassword(password);
console.log(result);
    if(!result)
    {
        return next(new ErrorHandler("Password not Matched",401));
    }
    
 // NOW CREATE JWT TOKEN USING USER _ID AND STORE JWT IN COOKIES
 const token =  user.getJwtToken();
 
 const options = {
     expires: new Date(
         Date.now() + 5 * 24 * 60 * 60 * 1000
     ),
     httpOnly : true
 }

 res.status(201).cookie("token", token, options).json({   //saved with name token
     success : true
 })
    
    
}


module.exports = loginUser;