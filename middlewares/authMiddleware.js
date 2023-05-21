// This middleware will check if the session is created and available in the req.session then it will take the user data from req.session and set to the request properties so that every request will get the user data we don't have to bring the data from database in every request

const User = require('../models/User');

const authMiddleware = {}

//If the user is authenticated and logged in then bind the user data with request properties
authMiddleware.bindMiddleware = (req, res, next) => {

    return async (req, res, next) => {
        //if there is no user in request body
        if (!req.session.isLoggedIn) {
            return next()
        }

        try {
            
            //If there is a user in session
            const isUser = await User.findById(req.session.user.id)
            if (isUser) {
                req.user = isUser
            }
            
            next()
        }
        catch (error) {
            res.status = 500
            next(error.message);
        }

    }
}


// If the user is not logged in then redirect to the login page
authMiddleware.isAuthenticated = (req,res,next)=>{
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login')
    }

    next()
}



module.exports = authMiddleware