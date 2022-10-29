

const express = require('express');
const Petservice = require('../services/petservice');
const petservice = new Petservice()

const petapi = (app)=>{
    const route = express.Router();

    app.use("/api",route);

    route.get('/getpets', async (req,res)=>{
        console.log(petservice.getpets())
        const result = await petservice.getpets();
        res.send(result) 
    })

    route.get('/getspeciedetails',async (req, res) =>{
        const result = await petservice.getspeciespets();
        res.send(result);
    })
    route.post('/insertpet', async (req,res) =>{
        const result = await petservice.insertpet();
        res.send(result)
    })
    
    
}

module.exports = petapi;