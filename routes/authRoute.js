const router = require('express').Router()

const signupValidator=require('../validators/auth/signupValidator')

//Auth signup middleware
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
router.post('/signup', signupValidator, signUpPostController)

//get Login Controller
router.get('/login', loginGetController)

//post Login Controller
router.post('/login', loginPostController)

//get Logout Controller
router.get('/logout', logout)

module.exports = router