const express = require('express');
const app=express();
const dotenv=require('dotenv');
const cors = require('cors'); // Add this

const { EncryptRot13,DecryptRot13 } = require('./routes/rot-13-cipher');
const { EncryptCaesar, DecryptCaesar } = require('./routes/caesar-cipher');
const { encryptVigenere,decryptVigenere } = require('./routes/vigenere');
const { encryptPlayfair,decryptPlayfair } = require('./routes/playfair');
const { EncryptRailFence,DecryptRailFence } = require('./routes/railfence-cipher');

dotenv.config();
app.use(express.json());
app.use(cors());

app.get('/',async(req,res)=>{
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cipher API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            h1 {
                color: #333;
            }
            .endpoint {
                margin-bottom: 20px;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .example {
                background-color: #f5f5f5;
                padding: 8px;
                border-radius: 3px;
                margin-top: 5px;
            }
        </style>
    </head>
    <body>
        <h1>Cipher API</h1>
        <p>✅ API is working</p>

        <h2>Frontend:</h2>
        <div>
            <h3> Cipherly Website</h3>
            <a href="https://cipherly-eight.vercel.app/">Cipherly</a>
        </div>

        <h2>Available Endpoints:</h2>
        
        <div class="endpoint">
            <h3>1. Encrypt Text</h3>
            <p>Endpoint: GET /cipher</p>
            <p>Examples:</p>
            <div class="example">
                <a href="${baseUrl}/cipher?text=hello&cipher=rot13">${baseUrl}/cipher?text=hello&cipher=rot13</a>
            </div>
            <div class="example">
                <a href="${baseUrl}/cipher?text=hello&cipher=caesar&shift=3">${baseUrl}/cipher?text=hello&cipher=caesar&shift=3</a>
            </div>
        </div>
        
        <div class="endpoint">
            <h3>2. Decrypt Text</h3>
            <p>Endpoint: GET /decipher</p>
            <p>Examples:</p>
            <div class="example">
                <a href="${baseUrl}/decipher?text=uryyb&cipher=rot13">${baseUrl}/decipher?text=uryyb&cipher=rot13</a>
            </div>
            <div class="example">
                <a href="${baseUrl}/decipher?text=khoor&cipher=caesar&shift=3">${baseUrl}/decipher?text=khoor&cipher=caesar&shift=3</a>
            </div>
        </div>
    </body>
    </html>
    `;
    res.status(200).send(html);
});

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

app.get('/decipher', async(req, res) => {
    try {
        const { text, cipher, shift, key, rails } = req.query;
        let result;
        
        if (!text || !cipher) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        
        switch(cipher) {
            case "rot13":
                result = DecryptRot13(text);
                break;
            case "caesar":
                result = DecryptCaesar(text, parseInt(shift));
                break;
            case "vigenere":
                result = decryptVigenere(text, key);
                break;
            case "playfair":
                result = decryptPlayfair(text, key);
                break;
            case "railfence":
                result = DecryptRailFence(text, parseInt(rails));
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
