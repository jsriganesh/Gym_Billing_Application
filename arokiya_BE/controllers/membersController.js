const express = require('express');
const router = express.Router();
const Category = require('../models/membersModel');
var moment = require('moment');
const { default: axios } = require('axios');
const { convertToISO } = require('../commonMethods');

// // Index route
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.render('index', { users });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// // Create route
// router.post('/', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.redirect('/users');
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });



router.post('/', async (req, res) => {
    try {


        let memberDetails = {...req.body}
        const {dateOfJoin} = memberDetails
        const {planDetails} = memberDetails
        const id = new Date().getTime()
        const nextPaymentDate = convertToISO(moment(new Date(moment(dateOfJoin))).add(planDetails.duration, 'days'))
        memberDetails={...memberDetails,nextPaymentDate:nextPaymentDate,memberID:id}
        console.log('req =',memberDetails)

        const paymentRequest = {
            memberName:memberDetails.memberName,
            memberID:id,
            paidDate:dateOfJoin,
            paidDateStr:moment(dateOfJoin).format('DD/MM/YYYY'),
            paidAmount:planDetails.paidAmount,
            planID:planDetails.planID,
            dueAmount:planDetails.planValue - planDetails.paidAmount,
            paidMethod:'COD'
        }

        const response = await axios.post('http://localhost:4004/paymentHistory', paymentRequest);


        if (response.status === 200) {
            const member = await Category.create(memberDetails)
            res.status(200).json(member)
            
        } else {
            res.status(500).json({ message: 'Error in the payment history route' });
        }

 
    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


router.post('/chartDetails', async (req, res) => {
    try{

        let data = {...req.body}
    
        const fromDate = data.fromDate;
        const toDate = data.toDate;
       
        const history = await Category.where('dateOfJoin').gt(fromDate).where('dateOfJoin').lt(toDate)
  

        const monthlyRecordCounts = Array(12).fill(0);

            // Process the data
            history.forEach((record) => {
            const date = new Date(record.dateOfJoin);
            const monthIndex = date.getMonth(); // Get month index (0 = January, 1 = February, ..., 11 = December)
            monthlyRecordCounts[monthIndex]++;
            });

            // Prepare the final output
            const result = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                data: monthlyRecordCounts
                }
            ]
            };

            console.log(result);


        res.status(200).json({data:result})
 
    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


router.get('/dueAmountChartDetails', async (req, res) => {
    try {
        const category = await Category.find({})
        
        const pendingDueAmount = category.filter(member=>member.planDetails.dueAmount  > 0)
        const feesNotPaid = category.filter(member=>member.planDetails.dueAmount === 0 && (new Date(member.nextPaymentDate) < new Date()))
        const fullAmountPaid = category.filter(member=>member.planDetails.dueAmount === 0 && (new Date(member.nextPaymentDate) > new Date()))
        
        // const filter = await category.where('paidDate').gt(fromDate).where('paidDate').lt(toDate)

        console.log('Total members -----',category.length)
        console.log('pendingDueAmount -----',pendingDueAmount.length)
        console.log('feesNotPaid -----',feesNotPaid.length)
        console.log('fullAmountPaid -----',fullAmountPaid.length)

        const data = [
            {
              name: "Full Amount paid",
              population: fullAmountPaid.length,
              color: '#15B55C',
              legendFontColor: '#15B55C',
              legendFontSize: 12
            },
              {
                name: "Fees not paid",
                population: feesNotPaid.length,
                color: '#FFF400',
                legendFontColor: '#FFF400',
                legendFontSize: 12
              },
              {
                name: "pending due Amount",
                population: pendingDueAmount.length,
                color: 'red',
                legendFontColor: 'red',
                legendFontSize: 12
              },
          ];
        
        res.status(200).json({data:data})

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


router.get('/', async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).json(category)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const category = await Category.findById(_id)
        res.status(200).json(category)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.put('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const category = await Category.findByIdAndUpdate(_id, req.body)
        if (!category) {
            return res.status(404).json({ message: `cant find the id ${_id}` })
        }
        const updatedCategory = await Category.findById(_id)
        res.status(200).json(updatedCategory)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const category = await Category.findByIdAndDelete(_id)
        if (!category) {
            return res.status(404).json({ message: `cant find the id ${_id}` })
        }
        res.status(200).json(category)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})



module.exports = router;
