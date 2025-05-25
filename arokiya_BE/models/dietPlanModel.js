const mongoose = require('mongoose')
const dietPlanSchema = mongoose.Schema(
    {
            dietPlanTitle:{
                type:String,
                required:[true,'Please Enter the Title']
            },
            dietPlanList:[{
                time:{
                    type:String,
                    required:[true,'Please Enter the time']
                },
                description:{
                    type:String,
                    required:[true,'Please Enter the description']
                },
                period:{
                    type:String,
                    required:[true,'Please Enter the period']
                }
                
            }],
            dietplanID:{
                type:Number,
                required:[true,'Please Enter the ID']
            }

    }
    )

const DietPlans = mongoose.model('DietPlans',dietPlanSchema)

module.exports = DietPlans