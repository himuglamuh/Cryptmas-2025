const ciphertext = process.argv[3];
const key = process.argv[4];

function xorRepeatingHex(hexCipher: string, key: string): string {
  const buf = Buffer.from(hexCipher, "hex");
  const keyBytes = Buffer.from(key, "utf-8");

  for (let i = 0; i < buf.length; i++) {
    buf[i] = buf[i] ^ keyBytes[i % keyBytes.length];
  }

  return buf.toString("utf-8");
}

export function main() {
  console.log(xorRepeatingHex(ciphertext, key));
}
