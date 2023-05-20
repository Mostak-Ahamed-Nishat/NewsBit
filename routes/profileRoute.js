const {dashboardGetController,profileCreateController}=require('../controllers/profileController')
const router=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleware')

router.get('/',isAuthenticated,dashboardGetController)

router.get('/create-profile',isAuthenticated,profileCreateController)


module.exports =router