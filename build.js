const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "dist");
const entries = ["index.html", "styles.css", "game.js", "assets"];

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const entry of entries) {
  copyRecursive(path.join(root, entry), path.join(out, entry));
}

console.log("Fishao static build ready in dist/");
