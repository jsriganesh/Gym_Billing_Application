const mongoose = require('mongoose')
const categorySchema = mongoose.Schema(
    {
        memberName:{
            type:String,
            required:[true,'Please Enter the member name']
        },
        bloodGroup:{
            type:String,
            required:[true,'Please select blood group']
        },
        mobileNo:{
            type:Number,
            required:[true,'Please Enter mobile no']
        },
        emailId:{
            type:String,
            required:[false,'']
        },
        advanceAmount:{
            type:Number,
            required:[false,'']
        },
        dateOfJoin:{
            type:String,
            required:[true,'Please Enter the DOJ']
        },
        dateOfBirth:{
            type:String,
            required:[true,'Please Enter the DOB']
        },
        lastpaymentDate:{
            type:String,
            required:[true,'Please Enter the last paymentDate']
        },
        nextPaymentDate:{
            type:String,
            required:[true,'Please Enter the next payment date']
        },
        address:{
            type:String,
            required:[true,'Please Enter the address']
        },
        profileImage:{
            type:String,
            required:[false,'']
        },
        memberID:{
            type:String,
            required:[true,'Please enter the Member is']
        },
        gender:{
            type:String,
            required:[true,'Please enter the gender']
        },
        planDetails:{
            planName:{
                type:String,
                required:[true,'Please Enter the planName']
            },
            planValue:{
                type:Number,
                required:[true,'Please Enter the planValue']
            },
            duration:{
                type:Number,
                required:[true,'Please Enter the duration']
            },
            planID:{
                type:Number,
                required:[true,'Please Enter the planID']
            },
            dueAmount:{
                type:Number,
                required:[true,'Please Enter the dueAmount']
            },
            paidAmount:{
                type:Number,
                required:[true,'Please Enter the paidAmount']
            },
        },
        dietPlanDetails:[{
            time:{
                type:String,
                required:[false,'']
            },
            description:{
                type:String,
                required:[false,'']
            },
            period:{
                type:String,
                required:[false,'']
            }
            
        }],
        
        image:{
            type:Number,
            required:false
        },

    }
)

const Category = mongoose.model('Members',categorySchema)

module.exports = Category