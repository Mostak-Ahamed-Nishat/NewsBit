//User profile pic upload handler


const fs = require("fs");

const Profile = require("../models/Profile")
const User = require("../models/User")

const upload = {}

upload.uploadProfilePicController = async (req, res, next) => {
    if (req.file) {
        //check this user has already profile or not
        try {
            let profile = await Profile.findOne({
                user: req.user._id
            })

            let profilePic = `/backend/uploads/${req.file.filename}`
            if (profile) {
                //If there is a profile  of this user have to update in the profile and user model
                //Update profilePic into profile model
                await Profile.findOneAndUpdate({
                    user: req.user._id,
                }, {
                    $set: {
                        profilePic
                    }
                })
            }

            //Update profilePic into User model if there is profile or not for both
            await User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $set: {
                    profilePic
                }
            })

            res.status(200).json({
                profilePic
            })

        } catch (error) {
            res.status(500).json({
                profilePic: '/backend/uploads/default.png'
            })
        }

    } else {
        res.status(500).json({
            profilePic: '/backend/uploads/default.png'
        })
    }
}

upload.removeProfilePicController = async (req, res, next) => {
    try {
        //Check if the user has already profile or not
        let profile = await Profile.findOne({
            user: req.user._id
        });

        //Get the default profile
        let defaultProfilePic = '/backend/uploads/default.png'

        //If the user has already profile remove from the profile 
        if (profile) {
            await Profile.findOneAndUpdate({
                _id: req.user._id
            }, {
                $set: {
                    profilePic: defaultProfilePic
                }
            })
        }

        //Delete the profile pic for both user who have profile or not
        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                profilePic: defaultProfilePic
            }
        })

        //Remove the profile pic from file also 

        console.log(req.user.profilePic);

        fs.unlink(`public/${req.user.profilePic}`, err => {
            if (err) {
                console.log(err.message);
            }
        })

        res.status(200).json({
            user: {
                profilePic: defaultProfilePic,
            },
            message: 'Profile picture was successfully removed'
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Can not remove profile picture'
        });
    }
}

module.exports = upload