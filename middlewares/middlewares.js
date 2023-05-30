const express = require('express')
//set session to request object
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session); //For store session to database
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const toastr = require('express-toastr');
//inside dependencies
const {
    bindMiddleware
} = require('./authMiddleware');
const setLocals = require('./setLocals');

// multer
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const CONNECTION_URI = 'mongodb://127.0.0.1/NewsBit';
//setup Session store
const store = new MongoDBStore({
    uri: CONNECTION_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
});

//Settings Middleware*****
const middleware = [
    express.urlencoded({
        extended: true
    }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    cookieParser('secret'),
    flash(),
    toastr(),
    bindMiddleware(),
    setLocals()
]

module.exports = (app) => {
    app.use(middleware)
}