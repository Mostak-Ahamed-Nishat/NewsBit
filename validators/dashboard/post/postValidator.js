const {
    body
} = require('express-validator')
const cheerio = require('cheerio')


module.exports = [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title must be specified')
    .isLength({
        min: 5,
        max: 100
    }).trim(),
    body('postBody')
    .not()
    .isEmpty()
    .withMessage('Post can not be empty')
    .custom(value => {
        // load the HTML data value from body and load
        let node = cheerio.load(value)
        //get the text only skip the all elements
        let text = node.text()

        //check the text now
        if (text.length > 5000) {
            throw new Error('Body can not be greater than 5000 characters')
        }
        return true
    })
]