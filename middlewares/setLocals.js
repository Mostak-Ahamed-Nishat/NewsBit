module.exports = () => {
    return async (req, res, next) => {
        if (req.user) {
            res.locals.user = req.user
            res.locals.isLoggedIn = req.session.isLoggedIn || false
        }
        next()
    }

}