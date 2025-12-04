const ciphertext = process.argv[3];

function caesarDecrypt(input: string, shift: number): string {
  return input
    .split("")
    .map((ch) => {
      let code = ch.charCodeAt(0);
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26 * 10) % 26) + 97);
      }
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26 * 10) % 26) + 65);
      }
      return ch;
    })
    .join("");
}

export function main() {
  console.log(caesarDecrypt(ciphertext, 7));
}
