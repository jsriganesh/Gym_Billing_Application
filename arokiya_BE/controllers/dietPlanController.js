const express = require('express');
const router = express.Router();
const DietPlans = require('../models/dietPlanModel');
var moment = require('moment');
const { default: axios } = require('axios');

router.post('/', async (req, res) => {
    try {
        let dietPlanDetails = {...req.body}
        const id = new Date().getTime()
        dietPlanDetails={...dietPlanDetails,dietplanID:id}
        console.log('req =',dietPlanDetails)

        const diet = await DietPlans.create(dietPlanDetails)
        res.status(200).json(diet)
       
    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const diet = await DietPlans.find({})
        res.status(200).json(diet)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

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
router.put('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const diet = await DietPlans.findByIdAndUpdate(_id, req.body)
        if (!diet) {
            return res.status(404).json({ message: `cant find the id ${_id}` })
        }
        const updatedPlan = await DietPlans.findById(_id)
        res.status(200).json(updatedPlan)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const diet = await DietPlans.findByIdAndDelete(_id)
        if (!diet) {
            return res.status(404).json({ message: `cant find the id ${_id}` })
        }
        res.status(200).json(diet)

    } catch (error) {
        console.log('ERROR:', error)
        res.status(500).json({ message: error.message })
    }
})



module.exports = router;
