const {
    body,
} = require('express-validator')

module.exports=[
    body('previousPassword').not().isEmpty().withMessage('Please enter your previous password'),
    body('newPassword').isLength({
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
        if (confirmPassword !== req.body.newPassword) {
            throw new Error('Confirm Password does not match')
        }
        return true;
    })
]