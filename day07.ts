const ciphertext = process.argv[3];
const key = process.argv[4];

type Pos = { r: number; c: number };

function buildPlayfairTable(key: string): { table: string[][]; posMap: Map<string, Pos> } {
  key = key.toLowerCase();
  const seen = new Set<string>();
  const order: string[] = [];

  const add = (ch: string) => {
    if (!/[a-z]/.test(ch)) return;
    if (ch === "j") ch = "i";
    if (!seen.has(ch)) {
      seen.add(ch);
      order.push(ch);
    }
  };

  for (const ch of key) add(ch);
  for (let code = 97; code <= 122; code++) {
    const ch = String.fromCharCode(code);
    if (ch === "j") continue;
    add(ch);
  }

  const table: string[][] = [];
  const posMap = new Map<string, Pos>();
  let idx = 0;
  for (let r = 0; r < 5; r++) {
    table[r] = [];
    for (let c = 0; c < 5; c++) {
      const ch = order[idx++];
      table[r][c] = ch;
      posMap.set(ch, { r, c });
    }
  }

  return { table, posMap };
}

function playfairDecrypt(cipher: string, key: string): string {
  const { table, posMap } = buildPlayfairTable(key);
  const clean = cipher.toLowerCase().replace(/[^a-z]/g, "").replace(/j/g, "i");
  const out: string[] = [];

  for (let i = 0; i < clean.length; i += 2) {
    const a = clean[i];
    const b = clean[i + 1];
    const pa = posMap.get(a)!;
    const pb = posMap.get(b)!;

    if (pa.r === pb.r) {
      // same row: shift left
      out.push(table[pa.r][(pa.c + 4) % 5]);
      out.push(table[pb.r][(pb.c + 4) % 5]);
    } else if (pa.c === pb.c) {
      // same column: shift up
      out.push(table[(pa.r + 4) % 5][pa.c]);
      out.push(table[(pb.r + 4) % 5][pb.c]);
    } else {
      // rectangle
      out.push(table[pa.r][pb.c]);
      out.push(table[pb.r][pa.c]);
    }
  }

  return out.join("");
}

function stripPlayfairFillerXs(text: string): string {
  const chars = text.split("");
  const out: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];

    // If this is an 'x' between two identical letters
    // (e.g., t x t in "little"),
    // treat it as a filler and skip it.
    if (
      ch === "x" &&
      i > 0 &&
      i < chars.length - 1 &&
      chars[i - 1] === chars[i + 1]
    ) {
      continue;
    }

    out.push(ch);
  }

  // Strip any trailing padding x's (common Playfair convention)
  return out.join("").replace(/x+$/g, "");
}

export function main() {
  console.log(stripPlayfairFillerXs(playfairDecrypt(ciphertext, key)));
}
