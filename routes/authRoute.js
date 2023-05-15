const router = require('express').Router()
const User = require('../models/User')
const {
    body
} = require('express-validator');

//Auth signup middleware
const authValidator = [
    body('fname').not().isEmpty().withMessage('First Name is required'),
    body('lname').not().isEmpty().withMessage('Last Name is required'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Not a valid e-mail address').normalizeEmail().trim().custom(async email => {
        let user = User.findOne({
            email
        })
        if (user.email === email) {
            throw new Error('E-mail already in use');
        }
    }),
    body('password').isEmpty().withMessage('Password is required').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body('confirmPassword').isEmpty().withMessage('Confirm Password is required').custom((confirmPassword, {
        req
    }) => {
        if (confirmPassword !== req.body.password) {
            return new Error('Password & ConfirmPassword does not match');
        }
    })
]






const {
    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController,
    logout
} = require('../controllers/authController');


//get SignUp controller
router.get('/signup', signUpGetController)

//Post SignUp controller
router.post('/signup', authValidator, signUpPostController)

//get Login Controller
router.get('/login', loginGetController)

//post Login Controller
router.post('/login', loginPostController)

//get Logout Controller
router.get('/logout', logout)

module.exports = router