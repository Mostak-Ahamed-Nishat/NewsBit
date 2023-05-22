//Dependance
const router = require('express').Router()


router.get('', (req, res, next) => {
    res.render('pages/dashboard/post/createPost',{
        title:'Create a new post',
    })
})

module.exports = router