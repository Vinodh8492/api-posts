const db = require('../config/db');
const mongoose = require('mongoose')

const useSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User',useSchema);
module.exports = User;