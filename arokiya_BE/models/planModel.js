const mongoose = require('mongoose')
const planSchema = mongoose.Schema(
    {
        planName:{
            type:String,
            required:[true,'Please Enter the planName']
        },
        planValue:{
            type:Number,
            required:[true,'Please Enter planValue']
        },
        planDuration:{
            type:Number,
            required:[true,'Please Enter planDuration']
        },
        planID:{
            type:Number,
            required:[true,'id']
        },
        

    }
)

const Plans = mongoose.model('Plans',planSchema)

module.exports = Plans