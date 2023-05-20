
const profile={}

profile.dashboardGetController=(req,res,next)=>{
    res.render('pages/dashboard/dashboard')
}

profile.profileCreateController=(req,res,next)=>{
    res.render('pages/dashboard/profile')
}



module.exports=profile