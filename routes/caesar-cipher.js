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
function DecryptCaesar(cipher,key){
    cipher=cipher.toLowerCase();
    let result='';
    for(let i=0;i<cipher.length;i++){
        if(cipher[i]!==' '){
            let temp = 97;
            let decrypted = String.fromCharCode((cipher.charCodeAt(i) - temp - key + 26) % 26 + temp);
            result+=decrypted;
        }
        else{
            result+=' ';
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

app.post('/decrypt-caesar',async(req,res)=>{
    try{
        const {cipher,key}=req.body;
        if(!cipher||!key){
            return res.status(400).json("No input");
        }
        const plaintext=DecryptCaesar(cipher,key);
        if(plaintext){
            return res.status(200).json({message:plaintext});
        }
        return res.status(400).json('Unknown Err');
    }
    catch(err){
        res.status(400).json(err);
    }
});
module.exports=app;