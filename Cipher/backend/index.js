const express = require('express');
const app=express();
const dotenv=require('dotenv');
const CipherRoutes=require('./routes/cipher');
dotenv.config();
app.use(express.json());

app.get('/',async(req,res)=>{
    res.status(200).json("Cipher API working");
});

app.listen(process.env.PORT||3001,()=>{
    console.log("Server Up");
});

app.use('/',CipherRoutes);