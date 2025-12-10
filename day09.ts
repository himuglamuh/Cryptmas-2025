const ciphertext = process.argv[3];
const key = process.argv[4];

function autokeyVigenereDecrypt(cipher: string, key: string): string {
  const c = cipher.toLowerCase().replace(/[^a-z]/g, "");
  const k = key.toLowerCase().replace(/[^a-z]/g, "");
  const plainChars: string[] = [];

  for (let i = 0; i < c.length; i++) {
    let kCh: string;
    if (i < k.length) {
      kCh = k[i];
    } else {
      // After the initial key, keystream is previous plaintext
      kCh = plainChars[i - k.length];
    }

    const cVal = c.charCodeAt(i) - 97;
    const kVal = kCh.charCodeAt(0) - 97;
    const pVal = (cVal - kVal + 26) % 26;
    const pCh = String.fromCharCode(97 + pVal);
    plainChars.push(pCh);
  }

  return plainChars.join("");
}

export function main() {
  console.log(autokeyVigenereDecrypt(ciphertext, key));
}
