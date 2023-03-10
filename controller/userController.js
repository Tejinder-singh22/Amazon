const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");

const registerUser = async (req, res) => {

    console.log("in post controller");
    console.log(req.body);

    const { username, email, password } = req.body;

    const user = await userModel.create({
        username, email, password,
    })

    // NOW CREATE JWT TOKEN USING USER _ID AND STORE JWT IN COOKIES
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(201).cookie("token", token, options).json({   //saved with name token
        success: true
    })

    // res.end(JSON.stringify({ success : true}));
}


const loginUser = async (req, res, next) => {


    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Enter Email or Password", 401));
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const result = await user.comparePassword(password);
    console.log(result);
    if (!result) {
        return next(new ErrorHandler("Password not Matched", 401));
    }

    // NOW CREATE JWT TOKEN USING USER _ID AND STORE JWT IN COOKIES
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(201).cookie("token", token, options).json({   //saved with name token
        success: true
    })


}

const getAllUsers = async (req, res) => {

    try {
        var users = await userModel.find();
    }
    catch (e) {
        return next(new ErrorHandler("Server Error", 500));
    }

    if (users) {
        res.status(200).json({
            success: true,
            userData: users
        })
    }
}

const logoutUser = (req, res) => {

    res.cookie("token", null, {
        expires: new Date(
            Date.now()
        ),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    })

}


const updateUser = async (req, res, next) => {

    const update = await userModel.findByIdAndUpdate({ _id: req.user.id }, {
        username: req.body.username,
        email: req.body.email
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })

}


module.exports = { loginUser, registerUser, logoutUser, getAllUsers, updateUser };