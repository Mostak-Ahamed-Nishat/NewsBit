const User = require("../models/User");
const {
    validationResult
} = require('express-validator')
const validationErrorFormatter = require('../utils/validationErrorFormatter')
const bcrypt = require('bcrypt');


//Get Signup page 
exports.signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Signup NewsBit'
    })
}


//Post Signup page 
exports.signUpPostController = async (req, res, next) => {

    let checkErrors = validationResult(req).formatWith(validationErrorFormatter)
    if (!checkErrors.isEmpty()) {
        console.log(checkErrors.mapped());
    } else {
        console.log('Error not found');
    }


    res.render('pages/auth/signup',{
        title:'NewsBit Signup'
    })

}


//Get Login page 
exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {
        title: "Login NewsBit"
    })
}
//Post Login page 
exports.loginPostController = async (req, res, next) => {

    // 1.Catch the user from login page
    const {
        email,
        password
    } = req.body


    //1.Get the user from database by authenticate user
    let authenticatedUser = await User.findOne({
        email
    })
    //2.Check the password
    let authenticatedPassword = await bcrypt.compare(password, authenticatedUser.password).then(function (result) {
        return result
    });

    //3.If user and password are valid

    if (authenticatedUser && authenticatedPassword === true) {
        //3.1 set the user data to request url so that can check every request

        console.log(req.session);
    }

    //4.If user and password are not valid

}

//Logout page 
exports.logout = (req, res, next) => {

}