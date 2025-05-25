const express = require('express');
const router = express.Router();
const DietPlans = require('../models/not-using-paymentReportChartModel');
var moment = require('moment');
const { default: axios } = require('axios');

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const diet = await DietPlans.findById(_id)
        res.status(200).json(diet)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;
