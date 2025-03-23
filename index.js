const express = require('express');
const app=express();
const dotenv=require('dotenv');
const cors = require('cors'); // Add this

// Add these imports to index.js
const { EncryptRot13,DecryptRot13 } = require('./routes/rot-13-cipher');
const { EncryptCaesar, DecryptCaesar } = require('./routes/caesar-cipher');
const { encryptVigenere,decryptVigenere } = require('./routes/vigenere');
const { encryptPlayfair,decryptPlayfair } = require('./routes/playfair');
const { EncryptRailFence,DecryptRailFence } = require('./routes/railfence-cipher');

dotenv.config();
app.use(express.json());
app.use(cors());

app.get('/',async(req,res)=>{
    res.status(200).json("Cipher API working");
});

// Add unified cipher endpoint
app.get('/cipher', async(req, res) => {
    try {
        const { text, cipher, shift, key, rails } = req.query;
        let result;
        
        if (!text || !cipher) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        
        switch(cipher) {
            case "rot13":
                result = EncryptRot13(text);
                break;
            case "caesar":
                result = EncryptCaesar(text, parseInt(shift));
                break;
            case "vigenere":
                result = encryptVigenere(text, key);
                break;
            case "playfair":
                result = encryptPlayfair(text, key);
                break;
            case "railfence":
                result = EncryptRailFence(text, parseInt(rails));
                break;
            default:
                return res.status(400).json({ error: "Invalid cipher type" });
        }
        
        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT||5000,()=>{
    console.log("Encryption Service running");
});
