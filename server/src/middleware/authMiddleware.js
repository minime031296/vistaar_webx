const jwt = require('jsonwebtoken')
require('dotenv').config()

const authToken = (req, res, next) => {
    const Token = req.headers.authorization?.split(" ")[1] || req.headers.Authorization?.split(" ")[1]

    if(!Token) {
        return res.status(401).json({success: false, message: `Token not provided`})
    }

    jwt.verify(Token , process.env.SECRET_KEY, (err, decoded) => {
        if(err) throw new Error(err)
        
        req.userId = decoded.id
        next()
    })

} 

module.exports = {authToken}