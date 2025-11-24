const dayArg = process.argv[2];


if (Number(dayArg) < 1 || Number(dayArg) > 12) {
    console.log("Error: Day must be between 1 and 12. It's called TWELVE Days of Cryptmas.");
    process.exit(1);
}

if (!dayArg || !/^\d{1,2}$/.test(dayArg)) {
  console.log("Usage: npm run day -- 5 arg1 arg2 arg3");
  process.exit(1);
}

const day = String(dayArg).padStart(2, "0");
const file = `./day${day}.ts`;
const argsForDay = process.argv.slice(3);

try {
  const mod = require(file);
  const fn = mod[`day${Number(day)}`] ?? mod.main ?? mod.default ?? mod;

  if (typeof fn !== "function") {
    console.log(`Error: day${day}.ts must export day${Number(day)}(), main(), or default function. Lamuh screwed up.`);
    process.exit(1);
  }

  console.log(`🎄🌟🎄 Day ${Number(day)} 🌟🎄🌟`);
  const result = fn(...argsForDay);
  return result;

} catch (err: any) {
  if (err.code === "MODULE_NOT_FOUND") {
    console.log(`Day ${Number(day)} not released yet – check back soon!`);
  } else {
    console.error("Error:", err.message);
  }
}
