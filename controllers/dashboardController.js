const validationErrorFormatter = require('../utils/validationErrorFormatter')
const {
    validationResult
} = require('express-validator')

const User = require('../models/User')
const Profile = require('../models/Profile')
const bcrypt = require('bcrypt');


//dashboard Object
const dashboard = {}

dashboard.dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {
        title: 'Dashboard'
    })
}
//Get create profile page

dashboard.createProfileGetController = async (req, res, next) => {

    const userProfile = await Profile.findOne({
        user: req.user._id
    })

    if (userProfile) {
        let {
            firstName,
            lastName,
            title,
            bio,
            links: {
                ...links
            }
        } = userProfile

        res.render('pages/dashboard/profile', {
            title: 'Update Profile',
            user: {
                fName: firstName,
                lName: lastName,
                title,
                bio,
                facebook: links.facebook,
                twitter: links.twitter,
                github: links.github,
                website: links.website,
                email: req.user.email,
                isProfile: true
            },
            error: {}
        })
    } else {
        res.render('pages/dashboard/profile', {
            title: 'Create Profile',
            user: {
                email: req.user.email,
                isProfile: false
            },
            error: {}
        })
    }

}
//Crate your profile 
dashboard.createProfilePostController = async (req, res, next) => {
    const reqData = {
        fName,
        lName,
        title,
        bio,
        facebook,
        twitter,
        github,
        website,
    } = req.body

    let profilePic = req.user.profilePics
    const errors = validationResult(req).formatWith(validationErrorFormatter)

    if (!errors.isEmpty()) {
        const errorMessage = errors.mapped()
        res.render('pages/dashboard/profile', {
            title: 'Invalid Create Profile',
            user: {
                ...reqData,
                email: req.user.email
            },
            error: errorMessage
        })
    } else {
        try {
            const user = await User.findOne({
                email: req.user.email
            })

            if (user) {
                let createProfile = new Profile({
                    user: req.user._id,
                    firstName: fName,
                    lastName: lName,
                    title,
                    bio,
                    profilePic,
                    links: {
                        website: website || '',
                        facebook: facebook || '',
                        twitter: twitter || '',
                        github: github || '',
                    }
                })

                const profile = await createProfile.save()

                await User.findOneAndUpdate({
                    _id: req.user._id
                }, {
                    $set: {
                        profile: profile._id
                    }
                })
                res.redirect('/dashboard')
            }

        } catch (error) {
            console.log(`Catching error: ${error.message}`);
        }
    }

}

dashboard.updateProfilePostController = async (req, res, next) => {
    const reqData = {
        fName,
        lName,
        title,
        bio,
        facebook,
        twitter,
        github,
        website,
    } = req.body

    let profilePic = req.user.profilePics
    const errors = validationResult(req).formatWith(validationErrorFormatter)

    if (!errors.isEmpty()) {
        const errorMessage = errors.mapped()
        res.render('pages/dashboard/profile', {
            title: 'Invalid Create Profile',
            user: {
                ...reqData,
                email: req.user.email
            },
            error: errorMessage
        })
    } else {
        try {

            const user = await User.findOne({
                email: req.user.email
            })


            if (user) {
                await Profile.findOneAndUpdate({
                    user: req.user._id
                }, {
                    $set: {
                        firstName: fName,
                        lastName: lName,
                        title,
                        bio,
                        profilePic,
                        links: {
                            website: website,
                            facebook: facebook,
                            twitter: twitter,
                            github: github,
                        }
                    }
                })
                res.redirect('back')
            }

        } catch (error) {
            console.log(`Catching error: ${error.message}`);
        }
    }

}

dashboard.passwordChangeGetController = async (req, res, next) => {
    res.render('pages/dashboard/password', {
        title: 'Change Password',
        error: {}
    })
}

dashboard.passwordChangePostController = async (req, res, next) => {

    const {
        previousPassword,
        newPassword,
        confirmPassword
    } = req.body
    console.log(req.user);

    const errors = validationResult(req).formatWith(validationErrorFormatter)

    if (!errors.isEmpty()) {
        const error = errors.mapped()
        res.render('pages/dashboard/password', {
            title: 'Change Password',
            error
        })
    } else {

        if (req.user) {

            bcrypt.compare(previousPassword, req.user.password, async (err, result) => {
                if (err) {
                    res.render('pages/dashboard/password', {
                        title: 'Change Password',
                        error: {
                            previousPassword: 'Previous Password does not match'
                        }
                    })
                } else {

                    const updatedPassword =await bcrypt.hash(newPassword, 10)
                    await User.findOneAndUpdate({
                        _id: req.user._id,
                    }, {
                        $set: {
                            password: updatedPassword
                        }
                    })

                    res.redirect('/dashboard')

                }
            })

        }
    }
}


module.exports = dashboard