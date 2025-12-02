const ciphertext = process.argv[3];

function rot13(input: string): string {
  return input
    .split("")
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 97 && code <= 122) {
        // a-z
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      }
      if (code >= 65 && code <= 90) {
        // A-Z
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      }
      return ch;
    })
    .join("");
}

export function main() {
  console.log(rot13(ciphertext));
}
