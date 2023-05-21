const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    updateProfilePostController
} = require('../controllers/dashboardController')

const router = require('express').Router()

const {
    isAuthenticated
} = require('../middlewares/authMiddleware')

const profileValidator = require('../validators/dashboard/profileValidator')

//*********Routers********* 
router.get('/', isAuthenticated, dashboardGetController)
//Get user profile page
router.get('/create-profile', isAuthenticated, createProfileGetController)
//Create user profile page
router.post('/create-profile', isAuthenticated, profileValidator, createProfilePostController)
//Update your profile
router.post('/update-profile', isAuthenticated, profileValidator, updateProfilePostController)

module.exports = router