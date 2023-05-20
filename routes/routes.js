// const router=require('express').Router();
const authRoute = require('./authRoute')
const profileRoute = require('./profileRoute')


const routes = [{
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/profile',
        handler: profileRoute
    },
    {
        path: '/',
        handler: (req, res, next) => {
            res.render('pages/home/index-2', {
                title: 'NewsBit - News Magazine Newspaper'
            })
        }
    }
]


module.exports = (app) => {
    routes.forEach(route => {
        if (route.path === '/') {
            app.get(route.path, route.handler)
        } else {
            app.use(route.path, route.handler)
        }
    })
}