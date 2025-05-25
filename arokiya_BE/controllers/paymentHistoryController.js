const express = require('express');
const router = express.Router();
const PaymentHistory = require('../models/paymentHistoryModel');
var moment = require('moment');


router.post('/', async (req, res) => {
    try {

        const id = new Date().getTime()

        let data = {...req.body}
        data = {...data,paymentID:id}
        
        const payment = await PaymentHistory.create(data)
        res.status(200).json(payment)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


const parseDate=(dateStr)=> {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JS Date
}


// paymentHistory


router.post('/chartDetails/', async (req, res) => {
    try {
  
      let data = {...req.body}
      // const fromDate = new Date(data.fromDate);
      // const toDate = new Date(data.toDate);
  
      const fromDate = data.fromDate;
      const toDate = data.toDate;
     
      const paymentHistory = await PaymentHistory.where('paidDate').gt(fromDate).where('paidDate').lt(toDate)
      const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

      // Initialize an array to store the total amounts for each month (index 0 for January, 1 for February, ..., 11 for December)
      const monthlyTotals = Array(12).fill(0);
      
      // Process the data
      paymentHistory.forEach((curr) => {
        const date = new Date(curr.paidDate);
        const monthIndex = date.getMonth(); // Get month index (0 = January, 1 = February, ..., 11 = December)
      
        // Add the current record's paidAmount to the corresponding month
        monthlyTotals[monthIndex] += curr.paidAmount;
      });
      
      // Prepare the final output
      const result = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            data: monthlyTotals
          }
        ]
      };
      console.log(result);

      const paymentList = {
          data:result
      }
  
  console.log('=====',paymentList)
  
      res.status(200).json({data:paymentList})
  
  } catch (error) {
      console.log('ERROR:', error)
      res.status(500).json({ message: error.message })
  }
  
  })
  

router.post('/filter/', async (req, res) => {
  try {

    let data = {...req.body}
    // const fromDate = new Date(data.fromDate);
    // const toDate = new Date(data.toDate);

    const fromDate = data.fromDate;
    const toDate = data.toDate;
   
    const paymentHistory = await PaymentHistory.where('paidDate').gt(fromDate).where('paidDate').lt(toDate)

    // const result = await PaymentHistory.find({
    //     paidDate: { $gt: fromDate, $lt: toDate }
    //   });
      


    // const query = {
    //     paidDate: {
    //       $gte: fromDate,
    //       $lte: toDate
    //     }
    //   };
    //   console.log('query ==',query)
    // const result = await PaymentHistory.find(query).pretty();


    // const result = await PaymentHistory.find(query); 
    // const result = await PaymentHistory.where('paidDate').gt(fromDate).where('paidDate').lt(toDate)

    const totalAmount = paymentHistory.reduce((acc, payment) => {
        return acc + payment.paidAmount;
      }, 0);

    const paymentList = {
        paymentDetails:paymentHistory,
        count:paymentHistory.length,
        totalAmount:totalAmount,
    }

console.log('=====',paymentList)

    res.status(200).json(paymentList)

} catch (error) {
    console.log('ERROR:', error)
    res.status(500).json({ message: error.message })
}

})


router.get('/', async (req, res) => {
    try {
        const paymentHistory = await PaymentHistory.find({})
        const totalAmount = paymentHistory.reduce((acc, payment) => {
            return acc + payment.paidAmount;
          }, 0);
          
        console.log('totalAmount ===',totalAmount)
        
        res.status(200).json({totalAmount:totalAmount,paymentDetails:paymentHistory})

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const paymentHistory = await PaymentHistory.findById(_id)
        res.status(200).json(paymentHistory)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;
