const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Model Requires
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');

router.get('/test', (req, res) => res.json({
    msg: "woo Profiles really WORK!"
}));

router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profile){
            errors.noprofile = "there are no profiles";
            return res.status(404).json(errors);
        }
        res.json(profiles);
    })
    .catch(err =>
        res.status(404).json({ profile: 'there are no profiles!'})
    );
});

router.get('/handle/:handle', (req, res) => {
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id', (req, res) => {
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio= req.body.bio;
    //maybe status
    if(req.body.status) profileFields.status = req.body.status;
    //Teams
    if(typeof req.body.teams !== 'undefined'){
        profileFields.teams = req.body.teams.split(',');
    }
    //Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.snapchat) profileFields.social.snapchat = req.body.snapchat;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile){
                //update profile
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                )
                .then(profile => res.json(profile));
            } else {
                //create profile

                //Check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile){
                            errors.handle = "That handle exists already";
                            res.status(400).json(errors);
                        }
                        //Save Profile
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile));
                    })
            }
        });
});


module.exports = router;