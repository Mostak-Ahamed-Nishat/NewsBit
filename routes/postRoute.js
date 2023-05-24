const { getPostPageController } = require('../controllers/postController')
const { isAuthenticated } = require('../middlewares/authMiddleware')
const router=require('express').Router()

router.get('/',isAuthenticated,getPostPageController)

module.exports=router