const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    admin: {
        type: Boolean
    }
})

module.exports = mongoose.model('usersModel', usersSchema)
