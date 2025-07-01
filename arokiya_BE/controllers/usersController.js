const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
var moment = require('moment');
const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');
const verifyToken = require('../commonMethods');
router.post('/register', async (req, res) => {
    try {
        let userDetails = {...req.body}
        const id = new Date().getTime()
        const data = {
            userName:userDetails.userName,
            emailId:userDetails.emailId,
            mobileNo:userDetails.mobileNo,
            password:userDetails.password,
            userID:id,
            type:userDetails.type
        }
        // packageDetails={...packageDetails,planID:id}
        // console.log('req =',packageDetails)

        const user = await User.create(data)
        res.status(200).json(user)
       
    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const {emailId,password}= req.body
        console.log({emailId,password})
        if(!emailId || !password) return res.status(400).json('All fields are required')

        let userDetails = await User.findOne({emailId})
        if(!userDetails) return res.status(400).json('user not exist!')

        if(userDetails.emailId === emailId && userDetails.password === password){

            const jwtWebToken = jwt.sign({userID:userDetails._id},process.env.JWT_SECRET,{expiresIn:'1d'})
            console.log('jwtWebToken ===',jwtWebToken)
            console.log('userDetails ===',userDetails)
            res.cookie('token',jwtWebToken,{
                httpOnly:true,
                secure:false,
                sameSite:'lax',
                maxAge:1*24*60*60*1000
            })
            const data = {
                userName:userDetails.userName,
                emailId:userDetails.emailId,
                mobileNo:userDetails.mobileNo,
                userID:userDetails.userID,
                type:userDetails.type,
                _id:userDetails._id,
                token:jwtWebToken
            }
            return res.status(200).json(data)
        }else{
            return res.status(400).json('Password Not matching')
        }

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;
