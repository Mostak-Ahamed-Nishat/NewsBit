const mongoose = require('mongoose');
const {
    Schema
} = mongoose

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 255,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 255,
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 255,
    },
    profilePic: String,
    links: {
        website: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        twitter: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        },
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;