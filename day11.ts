const desiredHash = process.argv[3];

import { createHash } from "crypto";
import * as fs from 'fs';
import * as readline from 'readline';

function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export async function main() {
  const filestream = fs.createReadStream('day11_wordlist.txt');

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const word = line.trim();
    const hash = sha256Hex(word);
    if (hash === desiredHash) {
      console.log(`Found matching word: ${word}`);
      return;
    }
    else {
      console.log(`No match for word: ${word} (hash: ${hash})`);
    }
  }
}
