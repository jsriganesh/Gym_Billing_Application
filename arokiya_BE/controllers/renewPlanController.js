const express = require('express');
const router = express.Router();
const RemewPlan = require('../models/paymentHistoryModel');
var moment = require('moment');
const Members = require('../models/membersModel');
const Plan = require('../models/planModel');
const PaymentHistory = require('../models/paymentHistoryModel');
const { convertToISO } = require('../commonMethods');

router.post('/', async (req, res) => {
    try {

        console.log('req.body renew plan -----',req.body)
        // {
        //     memberID:"",
        //     memberName:"",
        //     paidDate,
        //     paidAmount,
        //     planID,
        //     dueAmount,
        //     paidMethod,
        // }

        // const id = new Date().getTime()


        // lastpaymentDate
        
        
        let data = {...req.body,paidDateStr:moment(req.body.paidDate).format('DD/MM/YYYY')}
        const id = new Date().getTime()
        data = {...data,paymentID:id}

        // const response = await axios.post('http://localhost:4004/paymentHistory', paymentRequest);

        // if (response.status === 200) {


        const payment = await PaymentHistory.create(data)

        if(!payment){
            return res.status(404).json({ message: 'Somethingwent wrong, when update the palan' });
        }


        const {memberID,planID,dueAmount,paidMethod,paidDate,paidAmount,lastpaymentDate,nextPaymentDate} = req.body
        console.log('req.body -----',req.body)

        let memberDetails = await Members.findOne({memberID})
        const planDetails = await Plan.findOne({planID})
        console.log('memberDetails -----',memberDetails)
        console.log('planDetails -----',planDetails)

        const newPlanDetails= {
            planName: planDetails.planName,
            planValue: planDetails.planValue,
            duration: planDetails.planDuration,
            planID: planDetails.planID,
            dueAmount: dueAmount,
            paidAmount: paidAmount
        }

        let newMemberDetails = JSON.parse(JSON.stringify(memberDetails))


        // const todayDate = moment(new Date()).format('DD/MM/YYYY')

        // Calculation happened in FE
        // const upCommingnextPaymentDate = convertToISO(moment(new Date(moment(nextPaymentDate))).add(planDetails.planDuration, 'days'))
        const upCommingnextPaymentDate = nextPaymentDate
        
        newMemberDetails={
            ...newMemberDetails,
            nextPaymentDate:upCommingnextPaymentDate,
            lastpaymentDate:paidDate,
            planDetails:newPlanDetails

        }
        console.log('new member details === >',newMemberDetails)
        const member = await Members.findOneAndUpdate({ memberID }, newMemberDetails, { new: true });
        
        // dateOfJoin
        if (!member) {
            return res.status(404).json({ message: `Cannot find the member with ID ${memberID}` });
        }


        res.status(200).json(member);

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const paymentHistory = await RemewPlan.find({})
//         res.status(200).json(paymentHistory)

//     } catch (error) {
//         console.log('ERROR:', error)
//         res.status(500).json({ message: error.message })
//     }
// })

// router.get('/:_id', async (req, res) => {
//     try {
//         const { _id } = req.params
//         const paymentHistory = await RemewPlan.findById(_id)
//         res.status(200).json(paymentHistory)

//     } catch (error) {
//         console.log('ERROR:', error)
//         res.status(500).json({ message: error.message })
//     }
// })
// router.put('/:_id', async (req, res) => {
//     try {
//         const { _id } = req.params
//         const category = await Category.findByIdAndUpdate(_id, req.body)
//         if (!category) {
//             return res.status(404).json({ message: `cant find the id ${_id}` })
//         }
//         const updatedCategory = await Category.findById(_id)
//         res.status(200).json(updatedCategory)

//     } catch (error) {
//         console.log('ERROR:', error)
//         res.status(500).json({ message: error.message })
//     }
// })

// router.delete('/:_id', async (req, res) => {
//     try {
//         const { _id } = req.params
//         const category = await Category.findByIdAndDelete(_id)
//         if (!category) {
//             return res.status(404).json({ message: `cant find the id ${_id}` })
//         }
//         res.status(200).json(category)

//     } catch (error) {
//         console.log('ERROR:', error)
//         res.status(500).json({ message: error.message })
//     }
// })



module.exports = router;
