const ciphertext = process.argv[3];
const xorKey = process.argv[4];
const columnarKey = process.argv[5];
const vigenereKey = process.argv[6];

function xorSingleHex(hexCipher: string, keyByte: number): string {
  const buf = Buffer.from(hexCipher, "hex");
  for (let i = 0; i < buf.length; i++) {
    buf[i] = buf[i] ^ keyByte;
  }
  return buf.toString("utf-8");
}

function columnarDecryptInner(text: string, key: string): string {
  const cipher = text;
  const cols = key.length;
  const L = cipher.length;
  const rows = Math.ceil(L / cols);

  // We padded to rows*cols, so all columns are full
  const fullCols = cols;
  const colLens = new Array(cols).fill(rows);

  const indices = [...key].map((ch, idx) => ({ ch, idx }));
  indices.sort((a, b) => (a.ch < b.ch ? -1 : a.ch > b.ch ? 1 : 0));

  const colData: string[][] = new Array(cols);
  let pos = 0;
  for (const { idx } of indices) {
    const len = colLens[idx];
    colData[idx] = cipher.slice(pos, pos + len).split("");
    pos += len;
  }

  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r < colData[c].length) {
        out.push(colData[c][r]);
      }
    }
  }

  return out.join("").replace(/x+$/g, "");
}

function vigenereDecryptInner(cipher: string, key: string): string {
  const k = key.toLowerCase();
  let ki = 0;
  const out: string[] = [];

  for (const ch of cipher) {
    const code = ch.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) {
      const cVal = code - 97;
      const kVal = k[ki % k.length].charCodeAt(0) - 97;
      const pVal = (cVal - kVal + 26) % 26;
      out.push(String.fromCharCode(97 + pVal));
      ki++;
    } else {
      out.push(ch);
    }
  }

  return out.join("");
}

export function main() {
  // Layer 1: XOR decrypt with single-byte key
  const afterXor = xorSingleHex(ciphertext, xorKey);

  // Layer 2: Columnar decrypt with key
  const afterColumnar = columnarDecryptInner(afterXor, columnarKey);

  // Strip padding happens in columnarDecryptInner

  // Layer 3: Vigenère decrypt with key
  const plain = vigenereDecryptInner(afterColumnar, vigenereKey);
  console.log(plain);
}
