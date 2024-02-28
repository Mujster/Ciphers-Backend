const express = require('express');
const app=express.Router();

function EncryptCaesar(plaintext, key) {
    plaintext=plaintext.toLowerCase();
    let result = '';
    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i] !== ' ') {
            const temp = 97;
            const encrypted = String.fromCharCode((plaintext.charCodeAt(i) - temp + key) % 26 + temp);
            result += encrypted;
        } else {
            result += ' ';
        }
    }
    return result;
}

app.post('/encrypt-caesar',async(req,res)=>{
    try{
        const {plaintext,key}=req.body;
        if(!plaintext){
           return res.status(400).json("No Plaintext");
        }
        const cipher=EncryptCaesar(plaintext,key);
        if(cipher){
           return res.status(200).json({message:cipher});
        }
        return res.status(400).json("Unknown Errr");
    }
    catch(err){
        res.status(400).json(err);
    }
});
module.exports=app;