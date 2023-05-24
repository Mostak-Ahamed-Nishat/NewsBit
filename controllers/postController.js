//Dependance

const post = {}

post.getPostPageController = (req, res, next) => {
    res.render('pages/dashboard/post/createPost', {
        title: 'Create a new post',
    })
}

module.exports = post