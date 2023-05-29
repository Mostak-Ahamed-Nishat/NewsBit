//Dependance
const readingTime = require('reading-time');
const Post = require('../models/Post');

const {
    validationResult
} = require("express-validator")
const validationErrorFormatter = require("../utils/validationErrorFormatter")

const post = {}


post.postPageGetController = (req, res, next) => {
    res.render('pages/dashboard/post/createPost', {
        title: 'Create a new post',
        error: {}
    })
}


post.postPagePostController = async (req, res, next) => {

    let {
        title,
        tags,
        postBody,
    } = req.body

    let postThumbnail = req.body.postThumbnail ? req.body.postThumbnail : ''

    let errors = validationResult(req).formatWith(validationErrorFormatter)

    if (errors) {
        let error = errors.mapped()
        res.render('pages/dashboard/post/createPost', {
            title: 'Create a new post',
            error
        })
    }

    try {
        //Get the reading time of the post
        let readTime = readingTime(postBody);

        //split the tags with commas
        if (tags.length > 0) {
            tags = tags.split(',')
            tags.map(tag => tag.trim())
        }

        //If the title and body are available save to the database

        const createPost = new Post({
            title,
            body: postBody,
            tags,
            author: req.user._id,
            thumbnail: `/backend/uploads/${postThumbnail}`,
            readTime: readTime.text,
            likes: [],
            dislikes: [],
            comments: [],
        })

        await createPost.save()

        return res.end('HEllo')


    } catch (error) {
        console.log(error.message);
    }






}




module.exports = post