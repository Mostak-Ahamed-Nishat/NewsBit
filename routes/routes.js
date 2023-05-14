// const router=require('express').Router();
const authRoute = require('./authRoute')


const routes = [{
    path: '/auth',
    handler: authRoute
},{
    path:'/',
    handler:(req,res,next)=>{
        res.render('pages/home/index-2',{title:'NewsBit - News Magazine Newspaper'})
    }
}]


module.exports = (app) => {
    routes.forEach(route => {
        app.use(route.path, route.handler)
    })
}