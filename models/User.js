const mongoose = require('mongoose');
const {
    Schema
} = mongoose


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 45
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    profilePic: {
        type: String,
        default: "/backend/uploads/user.png",
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user'
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User