const ciphertext = process.argv[3];
const key = process.argv[4];

function columnarDecrypt(cipher: string, key: string): string {
  const cols = key.length;
  const L = cipher.length;
  const rows = Math.ceil(L / cols);

  // We padded during encryption to rows*cols, so treat all columns as full.
  const fullCols = cols;
  const colLens = new Array(cols).fill(rows);

  // Determine column order by sorting key letters
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

  // Strip padding 'x' used during encryption
  return out.join("").replace(/x+$/g, "");
}

export function main() {
  console.log(columnarDecrypt(ciphertext, key));
}
