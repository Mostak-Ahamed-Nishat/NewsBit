const User = require("../models/User");
const {validationResult }=require('express-validator')
const validationErrorFormatter = require("../utils/validationErrorFormatter");


exports.signUpGetController=(req, res, next) =>{

    res.render('pages/auth/signup',{title:'Signup NewsBit'})
}

exports.signUpPostController=(req, res, next) =>{
    const {fname,lname,email,password}=req.body

    const errors=validationResult(req).validationErrorFormatter()

    console.log(errors);
    

    
}

exports.loginGetController=(req, res, next) =>{
    res.render('pages/auth/login',{title:"Login NewsBit"})
}

exports.loginPostController=(req, res, next) =>{

}

exports.logout=(req, res, next) =>{

}