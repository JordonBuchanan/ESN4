const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
//Look up a way to integrate Facebook and Twitter!!!!!
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.export = User = mongoose.model('users', UserSchema);