# 🎄🌟🎄 MERRY 12 DAYS OF CRYPTMAS! 🌟🎄🌟

Welcome to the **12 Days of Cryptmas**! This festive season, we're celebrating over on [X](https://x.com/himuglamuh) (link to post coming once the event is live) with a special series. Each day, from December 1 to December 12, I'll be sharing content related to cryptography. Whether you're a beginner or an expert, it's my sincere hope that this will be fun, if not even a little educational.

## What to Expect

Each day, I'll make two posts:

1. A general explanation of the previous day's puzzle, and a link to code that demonstrates how you would solve it.
1. A new cryptographic puzzle to solve.

### Puzzles

Puzzles are designed to be approachable for beginners, but there's no hand holding out of the gate. I'll post about the solution the following day, but you can either skip past those posts and ignore the solutions so you can work them out on your own, or you can check out the solutions as they come out to see how I approached them. Or, you can just look in the replies for hints/spoilers. It's up to you!

Each puzzle will be posted on X, but when the event is over, I'll compile all the puzzles and solutions here in this repository.

You won't get much to work off of when I post a puzzle. In most cases, it'll just be a string of ciphertext, and you have to work out how it's encrypted, and how to reverse that encryption. **Your goal of every puzzle is to figure out what the plaintext is for the posted ciphertext.**

### Plaintext Solutions

Each plaintext solution is an all lowercase holiday-themed English word (or two - ex: `warmcookies`) with no spaces or punctuation. **If you complete all 12 puzzles (or find the answers in the replies), you'll have the password to the FINAL GIFT!!!**

### Code Solutions

For each puzzle, I'll provide code that demonstrates how to solve it. The code will be in TypeScript, and I've included a handy `day.ts` runner so you can validate your answer for each day (or just spoil it).

To run the code, follow these steps:

```bash
# 1. Make sure you have Node.js 18+ (most people already do)
#    → check with: node --version
#    → download from https://nodejs.org if needed

# 2. Clone and set up (only once)
git clone https://github.com/himuglamuh/Cryptmas-2025.git
cd Cryptmas-2025
npm install    # takes ~3 seconds

# 3. Run any day — all extra arguments are passed straight to the day’s function
# optionally wrap arguments in quotes if they contain spaces
npm run day -- 1 ciphertext        # Day 1 with only ciphertext
npm run day -- 4 ciphertext key    # Day 4 with ciphertext and a key
```

## Final Gift

In this repo, you might have noticed a file called [`final_gift.hc`](https://github.com/himuglamuh/Cryptmas-2025/blob/main/final_gift.hc). This is a [VeraCrypt](https://veracrypt.io/en/Home.html) encrypted container with your final gift inside. To open it, you'll need the password, which is formed by concatenating all 12 plaintext solutions from the puzzles in order, separated by dashes.

For instance, if the answers to the puzzles were:

1. himug
2. lamuh
3. put
4. too
5. much
6. work
7. into
8. this

The password would be `himug-lamuh-put-too-much-work-into-this`.

Once you have completed all twelve puzzles and have all twelve plaintext solutions, you can open the VeraCrypt container with that password to see your final gift!

```bash
veracrypt final_gift.hc /your/mount/point
# Then you'll be:
# prompted for password: put it in and press enter
# prompted about PIM: not needed, just press enter
# prompted about keyfiles: none, just press enter
# prompted about hidden volume: no, just press enter
```

Then you can explore the contents of the mounted volume at `/your/mount/point`!

# Thank You

Thank you for participating in the 12 Days of Cryptmas! I hope you have a ton of fun, and maybe even learn something. If you enjoyed this event, please let me know on X [@HimugLamuh](https://x.com/himuglamuh) - your feedback means a lot to me! Maybe even share the posts with others who might like to join in the fun.
