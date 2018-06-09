const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const passport = require('passport');
const passportTwitter = require('passport-twitter');
const User = require('../models/User');
const findOrCreate = require('mongoose-findorcreate');

passport.use(new TwitterStrategy({
    consumerKey: placeholder,
    consumerSecret: placeholder,
    callbackURL: "https://127.0.0.1:3000/"
},
function(token, tokenSecret, profile,cb){
    User.findOrCreate({ twitterId: profile.id}, function(err, user){
        return cb(err, user);
    });
}));