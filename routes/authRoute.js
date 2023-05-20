const router = require('express').Router()

const signupValidator=require('../validators/auth/signupValidator')
const loginValidator=require('../validators/auth/loginValidator')

//Auth signup middleware
const {
    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController');


//get SignUp controller
router.get('/signup', signUpGetController)

//Post SignUp controller
router.post('/signup', signupValidator, signUpPostController)

//get Login Controller
router.get('/login', loginGetController)

//post Login Controller
router.post('/login', loginPostController)

//get Logout Controller
router.get('/logout', logoutController)

module.exports = router