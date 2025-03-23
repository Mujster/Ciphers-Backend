const express = require ('express');
const app=express();

function EncryptRailFence(text, key) {

    let rail = new Array(key).fill().map(() => new Array(text.length).fill('\n'));
    let dir_down = false;
    let row = 0, col = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (row == 0 || row == key - 1) dir_down = !dir_down;
        rail[row][col++] = text[i];
        dir_down ? row++ : row--;
    }
    let result = '';
    for (let i = 0; i < key; i++)
        for (let j = 0; j < text.length; j++)
        if (rail[i][j] != '\n') result += rail[i][j];
    
    return result;
    }
    
    function DecryptRailFence(cipher, key) {
    let rail = new Array(key).fill().map(() => new Array(cipher.length).fill('\n'));
    let dir_down = false;
    let row = 0, col = 0;
    
    for (let i = 0; i < cipher.length; i++) {
        if (row == 0) dir_down = true;
        if (row == key - 1) dir_down = false;
        rail[row][col++] = '*';
        dir_down ? row++ : row--;
    }
    let index = 0;
    for (let i = 0; i < key; i++)
        for (let j = 0; j < cipher.length; j++)
        if (rail[i][j] == '*' && index < cipher.length) rail[i][j] = cipher[index++];
    let result = '';
    row = 0, col = 0;
    for (let i = 0; i < cipher.length; i++) {
        if (row == 0) dir_down = true;
        if (row == key - 1) dir_down = false;
        if (rail[row][col] != '*') result += rail[row][col++];
        dir_down ? row++ : row--;
    }
    
    return result;
    }

    app.post('/encrypt-railfence',async(req,res)=>{
        try{
            const {plaintext,key}=req.body;
            if(!plaintext){
               return res.status(400).json("No Plaintext");
            }
            const cipher=EncryptRailFence(plaintext,key);
            if(cipher){
               return res.status(200).json({message:cipher});
            }
            return res.status(400).json("Unknown Errr");
        }
        catch(err){
            res.status(400).json(err);
        }
    });
    
    app.post('/decrypt-railfence',async(req,res)=>{
        try{
            const {cipher,key}=req.body;
            if(!cipher||!key){
                return res.status(400).json("No input");
            }
            const plaintext=DecryptRailFence(cipher,key);
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