const express = require('express');
const router = express.Router();
const Plan = require('../models/planModel');
var moment = require('moment');
const { default: axios } = require('axios');

router.post('/', async (req, res) => {
    try {
        let packageDetails = {...req.body}
        const id = new Date().getTime()
        packageDetails={...packageDetails,planID:id}
        console.log('req =',packageDetails)

        const package = await Plan.create(packageDetails)
        res.status(200).json(package)
       
    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const package = await Plan.find({})
        res.status(200).json(package)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const Plan = await Plan.findById(_id)
        res.status(200).json(Plan)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})
router.put('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const package = await Plan.findByIdAndUpdate(_id, req.body)
        if (!package) {
            return res.status(404).json({ message: `cant find the id ${_id}` })
        }
        const updatedPlan = await Plan.findById(_id)
        res.status(200).json(updatedPlan)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:_id', async (req, res) => {
    try {
        console.log('--->',req.params._id)
        const { _id } = req.params
        const deletedPlan = await Plan.findByIdAndDelete(_id)
        console.log('Plan --->',deletedPlan)

        if (!deletedPlan) {
            return res.status(404).json({ message: `cant find the id ${_id}` })
        }
        res.status(200).json(deletedPlan)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})



module.exports = router;
