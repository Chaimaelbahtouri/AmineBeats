const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async(req, res, next)=>{
    try {
        const {email, password} = req.body
        const isAdmin = email === process.env.ADMIN_EMAIL

        if (!email ||! password) {
            return res.status(400).json({
                error:"All fields are required"
            })
        }
        if (!email.includes("@")) {
            return res.status(400).json({
                error: "Email is not valid"
        })
        }
        if (password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters"
            })
        }
            const user = new User({email,password,isAdmin})
            const saveUser = await user.save()
            const token = jwt.sign (
                {userId: saveUser._id, isAdmin: saveUser.isAdmin },
                process.env.JWT_SECRET,
                {expiresIn:'30d'}
            )
            res.status(201).json({
                user: saveUser,
                token
            });

        }catch (error) {
         next(error)
    }
})
router.post('/login',async(req,res, next)=> {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        
        if (!user) {
            return res.status(400).json({
                error: "Email Does Not Exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                error:"Incorrect password"
            })
        }

        const token = jwt.sign(
            {userId: user._id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )
        res.json({token})
    } catch (error) {
        next(error)
    }
})
module.exports = router