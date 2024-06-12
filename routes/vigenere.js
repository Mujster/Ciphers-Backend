const express=require('express')
const app=express()

function encrypt(text,key){
    const A = 'A'.charCodeAt(0);
    const Z = 'Z'.charCodeAt(0);

    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    text = text.toUpperCase().replace(/[^A-Z\s]/g, '');

    let encrypted = '';
    for (let i = 0, j = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);

        if (char >= A && char <= Z) {
            const shift = key.charCodeAt(j % key.length) - A;
            const encrypt = ((char - A + shift) % 26) + A;
            encrypted += String.fromCharCode(encrypt);
            j++;
        } else {
            encrypted += text[i];
        }
    }
    return encrypted;
}
function decrypt(text,key){
    const A = 'A'.charCodeAt(0);
    const Z = 'Z'.charCodeAt(0);

    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    text = text.toUpperCase().replace(/[^A-Z\s]/g, '');

    let decrypted = '';
    for (let i = 0, j = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);

        if (char >= A && char <= Z) {
            const shift = key.charCodeAt(j % key.length) - A;
            const decrypt = ((char - A - shift + 26) % 26) + A;
            decrypted += String.fromCharCode(decrypt);
            j++;
        } else {
            decrypted += text[i];
        }
    }

    return decrypted;
}
app.get('/yelo',(req,res)=>{
    res.json("jellp");
})

app.post('/encrypt-vigenere',(req,res)=>{
    const {plaintext,key}=req.body;
    if(!plaintext||!key){
        return res.status(400).json("No Plaintext Or Key");
    }
    try{
        const encrypted=encrypt(plaintext,key);
        res.status(200).json({message:encrypted});
    }
    catch(err){
        return res.status(400).json({err:err.message});
    }
});

app.post('/decrypt-vigenere',(req,res)=>{
    const {ciphertext,key}=req.body;
    if(!ciphertext||!key){
        return res.status(400).json("No Plaintext Or Key");
    }
    try{
        const decrypted=decrypt(ciphertext,key);
        res.status(200).json({message:decrypted});
    }
    catch(err){
        return res.status(400).json(err);
    }
});

module.exports=app;