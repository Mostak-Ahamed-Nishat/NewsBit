const router = require('express').Router()
const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    updateProfilePostController,
    passwordChangeGetController,
    passwordChangePostController
} = require('../controllers/dashboardController')
const {
    isAuthenticated
} = require('../middlewares/authMiddleware')
const changePasswordValidator = require('../validators/auth/changePasswordValidator')

const profileValidator = require('../validators/dashboard/profileValidator')

//*********Routers********* 
router.get('/', isAuthenticated, dashboardGetController)
//Get user profile page
router.get('/create-profile', isAuthenticated, createProfileGetController)
//Create user profile page
router.post('/create-profile', isAuthenticated, profileValidator, createProfilePostController)
//Update your profile
router.post('/update-profile', isAuthenticated, profileValidator, updateProfilePostController)
//Change password get controller
router.get('/change-password', isAuthenticated, passwordChangeGetController)
//Change password get controller
router.post('/change-password', isAuthenticated,changePasswordValidator, passwordChangePostController)

module.exports = router