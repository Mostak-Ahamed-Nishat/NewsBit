//Dependance
const readingTime = require('reading-time');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

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

    try {
        let {
            title,
            postBody,
            tags,
            postThumbnail
        } = req.body





        let errors = validationResult(req).formatWith(validationErrorFormatter)

        if (!errors.isEmpty()) {
            let error = errors.mapped()
            req.toastr.error('Validation Error')
            res.render('pages/dashboard/post/createPost', {
                title: 'Create a new post',
                error,
                req
            })
        }

        //Get the reading time of the post
        let readTime = readingTime(postBody).text;

        //Create post on database
        let savePostToDatabase = new Post({
            title,
            body: postBody,
            author: req.user._id,
            tags,
            thumbnail: postThumbnail === '' ? '' : `/backend/uploads/${postThumbnail}`,
            readTime
        })

        //save post to database
        let createdPost = await savePostToDatabase.save()

        // set the post id to user profile

        await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $push: {
                'posts': createdPost._id
            }
        })

        //set the success toaster message
        req.toastr.success('Post created successfully')

        //redirect back to post page
        res.render('pages/dashboard/post/createPost', {
            title: 'Create a new post',
            error: {},
            req
        })

    } catch (error) {
        next(error)
    }



}




module.exports = post