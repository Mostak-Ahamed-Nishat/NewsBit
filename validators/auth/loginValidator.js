const {
    body,
} = require('express-validator')



module.exports = [
    body('email').not().isEmpty().withMessage('Email is required').trim().normalizeEmail().isEmail().withMessage('Please enter a valid email address'),
    body('password').not().isEmpty().withMessage('Password is required')
]