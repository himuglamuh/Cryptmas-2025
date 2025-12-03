const ciphertext = process.argv[3];

function atbash(input: string): string {
  return input
    .split("")
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 97 && code <= 122) {
        // a-z
        return String.fromCharCode(122 - (code - 97));
      }
      if (code >= 65 && code <= 90) {
        // A-Z
        return String.fromCharCode(90 - (code - 65));
      }
      return ch;
    })
    .join("");
}

export function main() {
  console.log(atbash(ciphertext));
}
