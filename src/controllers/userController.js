const User = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSignUp = async(req, res) => {
    const {username, email, password} = req.body
    try {
        
        if(!username, !email, !password) {
            return res.status(401).json({success: false, message: `All fields are required`})}
    
        const existingUser = await User.findOne({email})
    
        if(existingUser) {
            return res.status(401).json({success: false, message: `User already exist`})}
    
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()

        res.status(200).json({
            success: true,
            message: `User signedUp`,
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `User signedUp failed`,
            error: error.message
        })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ success: false, message: "User doesn't exist, sign up" });
        }

        
        const confirmPassword = await bcrypt.compare(password, existingUser.password);

        if (!confirmPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.SECRET_KEY,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userid: existingUser._id, email: existingUser.email },
            process.env.SECRET_KEY,
            { expiresIn: "20m" }
        );

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            userToken: { accessToken, refreshToken }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message
        });
    }
};


module.exports = {
    userLogin, userSignUp
}