
function encryptVigenere(text,key){
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
function decryptVigenere(text,key){
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


module.exports={
    encryptVigenere,
    decryptVigenere
}