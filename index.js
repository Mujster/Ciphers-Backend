const express = require('express');
const app=express();
const dotenv=require('dotenv');
const rot13=require('./routes/rot-13-cipher');
const caesar=require('./routes/caesar-cipher');
const railfence=require('./routes/railfence-cipher')

dotenv.config();
app.use(express.json());

app.get('/',async(req,res)=>{
    res.status(200).json("Cipher API working");
});

app.listen(process.env.PORT||3001,()=>{
    console.log("Server Up");
});

app.use('/',rot13);
app.use('/',caesar);
app.use('/',railfence);