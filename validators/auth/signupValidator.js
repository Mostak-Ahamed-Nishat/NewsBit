const {
    body,
    check
} = require('express-validator')
const User = require('../../models/User')


module.exports = [
    body('fname').not().isEmpty().withMessage('First Name is required').trim(),
    body('lname').not().isEmpty().withMessage('Last Name is required').trim(),
    body('email').not().isEmpty().withMessage('email is required').normalizeEmail().isEmail().withMessage('Please enter valid email').custom(async email => {
        let user = await User.findOne({
            email: email
        })
        if (user) {
            console.log('True');
            throw new Error('E-mail already in use');
        }

    }),
    body('password').isLength({
        min: 8
    }).withMessage('Minimum 8 character needed').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage('Minimum 8 char with (a-z & A-Z) !@#$%^&*() and 0-9'),
    body('confirmPassword').custom((confirmPassword, {
        req
    }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Confirm Password does not match')
        }
        return true;
    })
]