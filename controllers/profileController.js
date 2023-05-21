const profile = {}

profile.dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard')
}
//Get create profile page
profile.profileGetController = (req, res, next) => {
    res.render('pages/dashboard/profile')
}
//Crate your profile 
profile.profilePostController = (req, res, next) => {
    const {
        fullName,
        email,
        title,
        bio,
        facebook,
        twitter,
        github,
        website
    } = req.body

    if(req.user.email===email){
        
    }else{
        console.log("Data corrupted");
    }


}


module.exports = profile