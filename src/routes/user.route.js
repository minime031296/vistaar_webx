const {Router} = require('express')
const { userSignUp, userLogin } = require('../controllers/userController')
const customValidator = require('../utils/validator')

const userRoutes = Router()

userRoutes.post('/signup',customValidator, userSignUp)
userRoutes.post('/login', userLogin)

module.exports = userRoutes