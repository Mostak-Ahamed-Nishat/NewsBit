const router = require('express').Router()

const {
    uploadProfilePicController,
    removeProfilePicController,
    postImageUploadController
} = require('../controllers/uploadController')

const {
    isAuthenticated
} = require('../middlewares/authMiddleware')

const upload = require('../middlewares/uploadMiddleware')

//profilePicFile is a name not id
router.post('/profilePic', isAuthenticated, upload.single('profilePic'), uploadProfilePicController)
//Field name  
router.post('/postimage', isAuthenticated, upload.single('post-image'), postImageUploadController)
router.delete('/profilePic', isAuthenticated, removeProfilePicController)

module.exports = router