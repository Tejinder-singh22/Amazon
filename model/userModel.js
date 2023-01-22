

const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const validator = require("validator");
const  bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({

    username : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required: [true, "please enter email"],
        unique: true,
    },
    role: {
       type: String,
       default: "user"
    },
    password: {
        type: String,
        required: [true,"please enter your password"],
    }
})

userSchema.pre("save",async function(next){ //pre is event ..here we want to encrypt pass before saving user schema
  
    if(!this.isModified("password")){  //if password field is not changed (same pw) then skip this step of db saving. other wise bycrypt newly entered password
       next();
    }
    this.password =  await bcrypt.hash(this.password,10) //if field is new or modified then encrypt and save
})

userSchema.methods.getJwtToken = function(){
     
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
    
  

}




module.exports =  mongoose.model("user",userSchema)