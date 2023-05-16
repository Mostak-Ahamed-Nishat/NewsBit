const User = require("../models/User");
const {
    validationResult
} = require('express-validator')
const validationErrorFormatter = require('../utils/validationErrorFormatter')
const bcrypt = require('bcrypt');


//Get Signup page 
exports.signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Signup NewsBit',
        user: '',
        error: ''
    })
}


//Post Signup page 
exports.signUpPostController = async (req, res, next) => {

    //get all the data from body
    const userData = {
        fname,
        lname,
        email,
        password,
        confirmPassword
    } = req.body



    //Check if there any error that user provided
    let checkErrors = validationResult(req).formatWith(validationErrorFormatter)

    //If there are any validation errors
    if (!checkErrors.isEmpty()) {
        const error = checkErrors.mapped()
        res.render(200, 'pages/auth/signup', {
            title: 'NewsBit Signup',
            user: userData,
            error
        })

    } else {
        //If there are not validation errors
        let hashPassword;
        //Create a hash password
        if (password === confirmPassword) {
            hashPassword = await bcrypt.hash(password, 10)
        }

        //If all required fields are present
        if (hashPassword !== null && fname && lname && email) {
            // Create a new to database
            const createUser = new User({
                username: lname.toLowerCase(),
                email,
                password: hashPassword
            })
            // Save the user in the database
            const createdUser = await createUser.save()

            // if user creation is successful
            if (createdUser) {
                res.redirect('login')
            } else {
                // if user creation is Failed
                res.status = 500,
                    res.render('pages/auth/signup', {
                        title: 'NewsBit Signup',
                        user: '',
                        error: ''
                    })
                console.log('User Creation Failed');
            }
        }
    }

    



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