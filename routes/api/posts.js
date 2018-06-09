const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//validator
const validatePostInput = require('../../validation/post')

router.get('/test', (req, res) => res.json({
    msg: "DAMMMM BRO POSTS really WORK!"
}));

router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(post))
        .catch(err => res.status(404).json({nopostfound: 'No post found'}));
});

router.post('/', passport.authenticate('jwt', { session: false}), upload.single('image'), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    cloudinary.uploader.upload(req.file.path, function(result) {
    const newPost = newPost({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        image = req.body.image = result.secure_url,
        user: req.user.id
    });
});
    newPost.save()
        .then(post => res.json(post));
});

//Delete Post route
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if(post.user.toString() !== req.user.id){
                    return res.status(401).json({ notauthorized: 'User not autherized'});
                }
                post.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
    });
});

//Update Post Route
//Make it.

//=======================
// Like & Dislike Routes
//=======================

//Like a Post Route
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
            .then(post => {
           if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ alreadyliked: 'User already liked this post'});
           }
           post.likes.unshift({ user: req.user.id });
           post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
    });
});

//Unlike a Post Route
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
            .then(post => {
           if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ notliked: 'You have notliked this post'});
           }
           const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(reg.user.id);
           post.likes.splice(removeIndex, 1);
           post.save().then(post =>res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
    });
});

//====================
// Comment Routes
//====================

//Comment Route
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), (req,res ) => {
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            cloudinary.uploader.upload(req.file.path, function(result) {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                image = req.body.image = result.secure_url,
                user: req.user.id
            }
        })
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
});

//Delete Comment
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res ) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ commentnotfound: 'comment not found!'});
            }
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
                post.comments.splice(removeIndex, 1);
                post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
});

//Update Comment Route
// Make it


module.exports = router;