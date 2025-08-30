const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");

const router = express.Router();

router.post('/register', async (req,res)=>{
    let model = req.body;
    if(model.name && model.email && model.password){
        await registerUser(model);
        res.send({
            message:"User Registered"
        });
    }else{
        res.status(400).json({
            error: "Please Provide Name , Email and Password."
        })
    }
});

router.post('/login', async (req,res)=>{
    let model = req.body;
    if(model.email && model.password){
        const result = await loginUser(model);
        if(result){
            res.send(result);
        }else{
            res.status(400).json({
                error: "Email or Password is incorrect."
            })
        }
    }else{
        res.status(400).json({
            error: "Please Provide Email and Password."
        })
    }
});

module.exports = router;