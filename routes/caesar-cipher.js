
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

module.exports = { EncryptCaesar, DecryptCaesar };