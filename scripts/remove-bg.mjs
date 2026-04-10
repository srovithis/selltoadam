import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const threshold = 230; // pixels with R,G,B all above this become transparent

for (let n = 1; n <= 3; n++) {
  const input = path.join(publicDir, `media${n}.webp`);
  const output = path.join(publicDir, `media${n}.png`);

  // Get raw RGBA pixel data
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // If the pixel is near-white, make it fully transparent
    if (r >= threshold && g >= threshold && b >= threshold) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log(`✓ media${n}.png saved (${info.width}x${info.height})`);
}

console.log("Done. White backgrounds removed.");
