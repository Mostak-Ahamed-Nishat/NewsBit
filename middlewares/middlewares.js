const express = require('express')
//set session to request object
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session); //For store session to database
const flash = require('connect-flash');
const {bindMiddleware}=require('./authMiddleware');
const setLocals=require('./setLocals');


const CONNECTION_URI = 'mongodb://127.0.0.1/NewsBit';
//setup Session store
const store = new MongoDBStore({
    uri: CONNECTION_URI,
    collection: 'sessions',
    expires:60*60*1000*2,
  });

//Settings Middleware*****
const middleware=[
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindMiddleware(),
    setLocals()
]

module.exports = (app)=>{
    app.use(middleware)
}