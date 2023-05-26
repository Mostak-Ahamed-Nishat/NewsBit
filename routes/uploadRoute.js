const router = require('express').Router()

const {
    uploadProfilePicController
} = require('../controllers/uploadController')

const {
    isAuthenticated
} = require('../middlewares/authMiddleware')

const upload = require('../middlewares/uploadMiddleware')

//profilePicFile is a name not id
router.post('/profilePic', isAuthenticated, upload.single('profilePic'), uploadProfilePicController)

module.exports = router