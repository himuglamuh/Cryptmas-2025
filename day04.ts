const ciphertext = process.argv[3];
const key = process.argv[4];

function vigenereDecrypt(cipher: string, key: string): string {
  const k = key.toLowerCase();
  let ki = 0;
  const out: string[] = [];

  for (const ch of cipher) {
    const code = ch.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) {
      const c = code - 97;
      const kch = k[ki % k.length].charCodeAt(0) - 97;
      const p = (c - kch + 26) % 26;
      out.push(String.fromCharCode(97 + p));
      ki++;
    } else {
      out.push(ch);
    }
  }

  return out.join("");
}

export function main() {
  console.log(vigenereDecrypt(ciphertext, key));
}
