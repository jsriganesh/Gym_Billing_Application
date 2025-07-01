const mongoose = require('mongoose')
const usersSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,'Please Enter the userName']
        },
        emailId:{
            type:String,
            required:[true,'Please Enter email']
        },
        password:{
            type:String,
            required:[true,'Please Enter password']
        },
        mobileNo:{
            type:Number,
            required:[true,'Please Enter mobileNo']
        },
        userID:{
            type:String,
            required:[true,'Please Enter String']
        },
        type:{
            type:String,
            required:[true,'Please Enter type']
        },
    }
)

const Users = mongoose.model('Users',usersSchema)

module.exports = Users