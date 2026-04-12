const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT_DIR = "./public/visual";
const MAX_WIDTH = 900;
const QUALITY = 78;

const files = fs.readdirSync(INPUT_DIR).filter(f =>
  /\.(png|jpg|jpeg)$/i.test(f)
);

(async () => {
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const before = fs.statSync(inputPath).size;

    try {
      let buf;

      if (ext === ".png") {
        // Try compressing as PNG first
        buf = await sharp(inputPath)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .png({ compressionLevel: 9 })
          .toBuffer();

        // If still over 900kb, convert to jpg
        if (buf.length > 900_000) {
          const jpgPath = inputPath.replace(/\.png$/i, ".jpg");
          buf = await sharp(inputPath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .jpeg({ quality: QUALITY })
            .toBuffer();
          fs.writeFileSync(jpgPath, buf);
          fs.unlinkSync(inputPath);
          console.log(`${file} → ${path.basename(jpgPath)}  ${kb(before)} → ${kb(buf.length)}`);
          continue;
        }
      } else {
        buf = await sharp(inputPath)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: QUALITY })
          .toBuffer();
      }

      fs.writeFileSync(inputPath, buf);
      console.log(`${file}  ${kb(before)} → ${kb(buf.length)}`);
    } catch (e) {
      console.error(`SKIP ${file}: ${e.message}`);
    }
  }

  console.log("\nDone.");
})();

function kb(b) { return (b / 1024).toFixed(0) + "kb"; }
