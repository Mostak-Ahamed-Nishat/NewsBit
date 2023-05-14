const User = require("../models/User");
const {validationResult }=require('express-validator')
const Flash = require("../utils/Flash");
const bcrypt = require('bcrypt');

exports.signUpGetController=(req, res, next) =>{

    res.render('pages/auth/signup',{title:'Signup NewsBit'})
}


exports.signUpPostController=async (req, res, next) =>{
    const {fname,lname,email,password,confirmPassword}=req.body

    let hashPassword;

    if(password===confirmPassword){
        hashPassword= await bcrypt.hash(password,10)
    }

    const user={
        fname,
        lname,
        email,
        password,
    }


    
    if(hashPassword!==null){
        const createUser=await new User({
            username:lname,
            email,
            password:hashPassword
        })
        const userCreated= await createUser.save()
        if(userCreated){
            console.log(user);
            res.redirect('/login')
        }else{
            res.redirect('auth/signup',{
                fname,
                lname,
                email,
                password,
                title: 'Signup NewsBit',
                // flash:Flash.getMessage(req)
            })
        }
    }
   
    

    
}

exports.loginGetController=(req, res, next) =>{
    res.render('pages/auth/login',{title:"Login NewsBit"})
}

exports.loginPostController=async (req, res, next) =>{

    // ****Steps****
    //1.Catch the user from login page

    const {email, password} = req.body

    try {
    //2.Find user in database
        let user=User.findOne({ email: email})
        console.log(user);
    } catch (error) {
        console.log('Not found');
    }


}

exports.logout=(req, res, next) =>{

}