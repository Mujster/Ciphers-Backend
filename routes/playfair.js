const express = require('express');
const app=express();

function generateMatrix(key){
    let temp = '';
    let ch=new Set();
    
    key = key.toUpperCase().replace(/J/g, 'I');

    for (let char of key) {
        if (!ch.has(char) && char >= 'A' && char <= 'Z') {
            temp += char;
            ch.add(char);
        }
    }
    
    for (let char = 'A'.charCodeAt(0); char <= 'Z'.charCodeAt(0); char++) {
        if (!ch.has(String.fromCharCode(char)) && String.fromCharCode(char) !== 'J') {
            temp += String.fromCharCode(char);
            ch.add(String.fromCharCode(char));
        }
    }
    
    let matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix.push(temp.slice(i * 5, i * 5 + 5).split(''));
    }
    return matrix;
}

function returnIdx(matrix,ch){
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            if(matrix[i][j]==ch){
                return {row:i,col:j};
            }
        }
    }
    return null;
}

function encrypt(plaintext,key){
    let matrix=generateMatrix(key);
    let text=plaintext.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    if(text.length%2!==0){
        text+='X';
    }
    let cipher='';
    for(let i=0;i<text.length;i+=2){
        let ch1=text[i];
        let ch2=text[i+1];
        if(ch1===ch2){
            ch2='X';
        }
        let idx1=returnIdx(matrix,ch1);
        let idx2=returnIdx(matrix,ch2);
        if(idx1.row===idx2.row){
            cipher+=matrix[idx1.row][(idx1.col+1)%5]+matrix[idx2.row][(idx2.col+1)%5];
        }
        else if(idx1.col===idx2.col){
            cipher+=matrix[(idx1.row + 1) % 5][idx1.col]+matrix[(idx2.row + 1) % 5][idx2.col]
        }
        else{
            cipher+=matrix[idx1.row][idx2.col]+matrix[idx2.row][idx1.col];
        }
    }
    return cipher;
}
function decrypt(ciphertext,key){
    let matrix=generateMatrix(key);
    let text=ciphertext.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g,'');
    let plain='';
    for(let i=0;i<text.length;i+=2){
        let ch1=text[i];
        let ch2=text[i+1];
        let idx1=returnIdx(matrix,ch1);
        let idx2=returnIdx(matrix,ch2);
        if(idx1.row===idx2.row){
            plain+=matrix[idx1.row][(idx1.col+4)%5]+matrix[idx2.row][(idx2.col+4)%5];
        } 
        else if(idx1.col===idx2.col){
            plain+=matrix[(idx1.row+4)%5][idx1.col]+matrix[(idx2.row+4)%5][idx2.col];
        } 
        else{
            plain+=matrix[idx1.row][idx2.col]+matrix[idx2.row][idx1.col];
        }
    }
    return plain;
}

app.post('/encrypt-playfair',(req,res)=>{
    try{
        const {plaintext,key}=req.body;
        if(!plaintext||!key){
            return res.status(400).json("No Plaintext or Key");
        }
        const encrypted=encrypt(plaintext,key);
        res.status(200).json({message:encrypted});     
    }
    catch(err){
        return res.status(400).json({err:err.message});
    }
});

app.post('/decrypt-playfair',(req,res)=>{
    try{
        const {ciphertext,key}=req.body;
        if(!ciphertext||!key){
            return res.status(400).json("No ciphertext or Key");
        }
        const decrypted=decrypt(ciphertext,key);
        res.status(200).json({message:decrypted});  
    }
    catch(err){
        return res.status(400).json({err:err.message});
    }
});

module.exports=app;