const userModel =  require("../model/userModel");


const registerUser = async (req,res)=>{

    console.log("in post controller");
    console.log(req.body    );
  
    const {username, email, password} = req.body;

    const user = await userModel.create({
        username, email, password,
    })

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

    // res.end(JSON.stringify({ success : true}));
}


module.exports = registerUser;