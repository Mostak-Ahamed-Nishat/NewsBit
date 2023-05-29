const mongoose = require('mongoose');
const {
    Schema
} = mongoose

const categorySchema = new Schema({
    categoryName: {
        type: String,
        trim: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

let Category = mongoose.model('Category', categorySchema);
module.exports = Category