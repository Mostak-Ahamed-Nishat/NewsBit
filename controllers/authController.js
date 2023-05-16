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
        title: "Login NewsBit",
        user:'',
        error:''
    })
}


//Post Login page 
exports.loginPostController = async (req, res, next) => {

    // 1.Catch the user from login page
    const user = {
        email,
        password
    } = req.body

    //Check if there any validation error
    const checkErrors = validationResult(req).formatWith(validationErrorFormatter)
    //if get validation error return with error message
    if (!checkErrors.isEmpty()) {
        const error = checkErrors.mapped()
        console.log(error);
        res.render(200, 'pages/auth/signup', {
            title: 'NewsBit Signup',
            user: user,
            error
        })
    }
    //if no validation error
    try {
        //get the user from Database
        let validUser
        if (user.email) {
            validUser = await User.findOne({
                email: user.email
            });
        }
        //if user exist with this email
        if (validUser) {
            //check the password
            const checkPassword = await bcrypt.compare(password,validUser.password).then(res=> res)
            //If the password is correct
            if (checkPassword) {
                res.redirect('/')
            } else {
                //If password is incorrect
                res.render('pages/auth/login', {
                    title: 'Login NewsBit',
                    user,
                    error: {
                        password: 'Wrong password',
                    }
                })
            }
        } else {
            //if user does not exist with this email
            res.render('pages/auth/login', {
                title: 'Login NewsBit',
                user,
                error: {
                    email: 'User not found Invalid Email '
                }
            })
        }
    } catch (error) {
        res.status = 500
        next(error.message)
    }



}

//Logout page 
exports.logout = (req, res, next) => {

}