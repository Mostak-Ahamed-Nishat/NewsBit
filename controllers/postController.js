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
        error: {},
        req
    })
}


post.postPagePostController = async (req, res, next) => {

    req.toastr.success('Post created successfully')

    let {
        title,
        tags,
        postBody,
    } = req.body

    let postThumbnail = req.body.postThumbnail ? req.body.postThumbnail : ''



    try {

        let errors = validationResult(req).formatWith(validationErrorFormatter)

        if (errors) {
            let error = errors.mapped()
            res.render('pages/dashboard/post/createPost', {
                title: 'Create a new post',
                error,
                req
            })
        } else {
            //Get the reading time of the post
            let readTime = readingTime(postBody);

            //split the tags with commas
            if (tags.length > 0) {
                tags = tags.split(',')
                tags.map(tag => tag.trim())
            }


            //If the title and body are available save to the database
            new Post({
                title,
                body: postBody,
                tags,
                author: req.user._id,
                thumbnail: `/backend/uploads/${postThumbnail}`,
                readTime: readTime.text,
                likes: [],
                dislikes: [],
                comments: [],
            }).save()

            // await createPost

            req.toastr.success('Post created successfully')

            res.render('pages/dashboard/post/createPost', {
                title: 'Create a new post',
                req,
                error: {},
            })

        }

    } catch (error) {
       next(error)
    }




}




module.exports = post