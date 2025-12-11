const ciphertext = process.argv[3];
const a = process.argv[4];
const b = process.argv[5];

function modInverse(a: number, m: number): number {
  // brute-force is fine for m=26
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error("No modular inverse");
}

function affineDecrypt(cipher: string, a: number, b: number): string {
  const m = 26;
  const aInv = modInverse(a, m);
  const out: string[] = [];

  for (const ch of cipher) {
    const code = ch.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) {
      const cVal = code - 97;
      const pVal = (aInv * (cVal - b + m * 10)) % m;
      out.push(String.fromCharCode(97 + pVal));
    } else {
      out.push(ch);
    }
  }

  return out.join("");
}

export function main() {
  console.log(affineDecrypt(ciphertext, a, b));
}
