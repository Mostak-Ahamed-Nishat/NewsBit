const {
    postPageGetController,
    postPagePostController
} = require('../controllers/postController')
const {
    isAuthenticated
} = require('../middlewares/authMiddleware')
const postValidator = require('../validators/dashboard/post/postValidator')
const router = require('express').Router()

//Post create get controller
router.get('/', isAuthenticated, postPageGetController)

//Post create Post controller
router.post('/', isAuthenticated, postValidator, postPagePostController)

module.exports = router