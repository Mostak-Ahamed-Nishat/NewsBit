const router = require('express').Router()

router.get('/', function (req, res, next) {
    res.render('play', {
        req
    })
})
 
router.post('/', function (req, res, next) {
    req.toastr.success('post created successfully');
    res.render('play', {
        req
    })

})



module.exports = router