const mongoose = require('mongoose')
const paymentHistorySchema = mongoose.Schema(
    {
        memberName:{
            type:String,
            required:[true,'Please Enter the member name']
        },
        memberID:{
            type:Number,
            required:[true,'Please Enter the  memberID']
        },
        paidDate:{
            type:String,
            required:[true,'Please Enter the  paidDate']
            
        },
        paidAmount:{
            type:Number,
            required:[true,'Please Enter the  paidAmount']
        },
        planID:{
            type:Number,
            required:[true,'Please Enter the  planID']
        },
        dueAmount:{
            type:Number,
            required:[true,'Please Enter the  dueAmount']
        },
        paidMethod:{
            type:String,
            required:[true,'Please Enter the  paidMethod']
        },
        paymentID:{
            type:Number,
            required:[true,'Please Enter the  paymentID']
        },
        paidDateStr:{
            type:String,
            required:[true,'Please Enter the  paymentID']
        }
        
        

    }
)

const paymentHistory = mongoose.model('PaymentHistory',paymentHistorySchema)

module.exports = paymentHistory