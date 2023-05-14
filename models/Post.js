const mongoose = require('mongoose');
const {
    Schema
} = mongoose



const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    thumbnail: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    readTime: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})

//For search we have to say some filed as searchable || weights: kar priority koto
postSchema.index({
    title: 'text',
    body: 'text',
    tags: 'text'
}, {
    weights: {
        title: 5,
        tags: 5,
        body: 5
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post