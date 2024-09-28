const {Schema, model} = require('mongoose')

const userScehma = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userScehma)

module.exports = User