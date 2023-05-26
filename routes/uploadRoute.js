const router = require('express').Router()

const {
    uploadProfilePicController,
    removeProfilePicController
} = require('../controllers/uploadController')

const {
    isAuthenticated
} = require('../middlewares/authMiddleware')

const upload = require('../middlewares/uploadMiddleware')

//profilePicFile is a name not id
router.post('/profilePic', isAuthenticated, upload.single('profilePic'), uploadProfilePicController)
router.delete('/profilePic', isAuthenticated, removeProfilePicController)

module.exports = router