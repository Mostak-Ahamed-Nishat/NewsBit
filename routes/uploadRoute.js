const router = require('express').Router()
const {
    uploadProfilePic
} = require('../controllers/uploadController')

const {
    isAuthenticated
} = require('../middlewares/authMiddleware')

const upload = require('../middlewares/uploadMiddleware')


router.post('/profilePic', isAuthenticated, upload.single('profilePic'), uploadProfilePic)

module.exports = router