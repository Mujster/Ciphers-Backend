const express = require('express');
const app=express.Router();

function EncryptRot13(plaintext) {
    plaintext=plaintext.toLowerCase();
    let result = '';
    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i] !== ' ') {
            const temp = 97;
            const encrypted = String.fromCharCode((plaintext.charCodeAt(i) - temp + 13) % 26 + temp);
            result += encrypted;
        } else {
            result += ' ';
        }
    }
    return result;
}
// function EncryptSubstitution(){}
// function EncryptAffine(){}
// function EncryptRailFence(){}
// function EncryptColumnar(){}
// function EncryptPlayFair(){}
// function EncryptHillClimbing(){}

app.post('/encrypt-rot13',async(req,res)=>{
    try{
        const {plaintext}=req.body;
        if(!plaintext){
           return res.status(400).json("No Plaintext");
        }
        const cipher=EncryptRot13(plaintext);
        if(cipher){
          return res.status(200).json({message:cipher});
        }
    }
    catch(err){
        return res.status(400).json(err);
    }
});

module.exports=app;