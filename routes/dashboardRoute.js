const {dashboardGetController,profileGetController,profilePostController}=require('../controllers/profileController')
const router=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleware')

router.get('/',isAuthenticated,dashboardGetController)
//Get user profile page
router.get('/create-profile',isAuthenticated,profileGetController)
//Create user profile page
router.post('/create-profile',isAuthenticated,profilePostController)

module.exports =router