//User profile pic upload handler

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

module.exports = upload