const mongoose = require('mongoose');

let userShema = mongoose.Schema({

    userName: String,
    facebook: String,
    instagram: String,
    tiktok: String,
    youtube: String,
    phone: String,
    whatsapp: String,
    twitter: String,
    email: String,
    website: String,
    linkdin: String,
    image:String
});

let users = mongoose.model('users', userShema);

module.exports = users;
