const ciphertext = process.argv[3];
const rails = parseInt(process.argv[4], 10);

function railFenceDecrypt(cipher: string, rails: number): string {
  const n = cipher.length;
  if (rails <= 1 || rails >= n) return cipher;

  const pattern: number[] = [];
  let row = 0;
  let dir = 1;

  for (let i = 0; i < n; i++) {
    pattern.push(row);
    if (row === 0) dir = 1;
    else if (row === rails - 1) dir = -1;
    row += dir;
  }

  const counts = new Array(rails).fill(0);
  for (const r of pattern) counts[r]++;

  const railsBuf: string[][] = [];
  let pos = 0;
  for (let r = 0; r < rails; r++) {
    const len = counts[r];
    railsBuf[r] = cipher.slice(pos, pos + len).split("");
    pos += len;
  }

  const idx = new Array(rails).fill(0);
  const out: string[] = [];
  for (const r of pattern) {
    out.push(railsBuf[r][idx[r]++]);
  }

  return out.join("");
}

export function main() {
  console.log(railFenceDecrypt(ciphertext, rails));
}
