const {
    body
} = require('express-validator')

const validator = require('validator')

const linkValidator = value => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error('Please enter a valid URL');
        }
    }
    return true
}

module.exports = [
    body('fName').not().isEmpty().withMessage('First Name is required').isLength({
        min: 3,
        max: 15
    }).withMessage('Name should be at least 3 characters').trim(),
    body('lName').trim(),
    body('title')
    .not().isEmpty().withMessage('Title is required').isLength({
        max: 100
    }).withMessage('Title can not exceed 100 characters'),
    body('bio')
    .not().isEmpty().withMessage('Bio is required').isLength({
        max: 500
    }).withMessage('Bio can not exceed 500 characters'),
    body('website')
    .custom(linkValidator),
    body('facebook')
    .custom(linkValidator),
    body('twitter')
    .custom(linkValidator),
    body('github')
    .custom(linkValidator),
]