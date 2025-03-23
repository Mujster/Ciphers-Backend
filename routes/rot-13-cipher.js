
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

function DecryptRot13(ciphertext) {
    ciphertext=ciphertext.toLowerCase();
    let result = '';
    for (let i = 0; i < ciphertext.length; i++) {
        if (ciphertext[i] !== ' ') {
            let temp = 97;
            let encrypted = String.fromCharCode((ciphertext.charCodeAt(i) - temp - 13) % 26 + temp);
            result += encrypted;
        } else {
            result += ' ';
        }
    }
    return result;
}


module.exports = {
  EncryptRot13,
  DecryptRot13
};