const Joi = require('joi')


const customValidator = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        email: Joi.string().required().pattern(new RegExp('[a-zA-Z0-9.*%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')),
        password: Joi.string().required()
    })
    
    console.log(schema)
    next()
}

module.exports = customValidator