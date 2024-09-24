const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../models/Account');

const router = express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    })

    res.json({
        msg:`Account balance is :: ${account.balance}`
    })
})

router.post('/transfer' , authMiddleware , async (req,res) =>{
    
})
module.exports = router;