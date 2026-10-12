const sharp = require('sharp');
const path = require('path');

async function smoothTransition() {
  const bgPath = path.join(__dirname, '../public/hero-3pages-bg.png');
  const outPath = path.join(__dirname, '../public/hero-3pages-bg-2k.png');
  const outNormal = path.join(__dirname, '../public/hero-3pages-bg.png');

  const meta = await sharp(bgPath).metadata();
  console.log('Original dimensions:', meta.width, meta.height);

  // We want to eliminate the feeling that the page is horizontally divided.
  // In the background image, the pink silk wave has a sharp lower boundary around y=780-960.
  // We apply a soft, elegant diffuse mask:
  // 1. A smooth vertical gradient that gently transitions from the pink silk down into the cream wall (#F8EEE5)
  // 2. An ambient radial soft light centered behind the confidence section header so the transition feels like warm salon lighting
  const svgOverlay = Buffer.from(`
    <svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Soft vertical blending gradient across the transition zone -->
        <linearGradient id="softSeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F8EEE5" stop-opacity="0" />
          <stop offset="25%" stop-color="#F8EEE5" stop-opacity="0" />
          <stop offset="29%" stop-color="#F8EEE5" stop-opacity="0.35" />
          <stop offset="33%" stop-color="#F8EEE5" stop-opacity="0.82" />
          <stop offset="36%" stop-color="#F8EEE5" stop-opacity="0.95" />
          <stop offset="40%" stop-color="#F8EEE5" stop-opacity="0.6" />
          <stop offset="46%" stop-color="#F8EEE5" stop-opacity="0" />
          <stop offset="100%" stop-color="#F8EEE5" stop-opacity="0" />
        </linearGradient>

        <!-- Ambient radial glow that blends the center into a seamless dreamy atmosphere -->
        <radialGradient id="ambientGlow" cx="50%" cy="34%" r="40%">
          <stop offset="0%" stop-color="#FBF4ED" stop-opacity="0.85" />
          <stop offset="50%" stop-color="#F8EEE5" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#F8EEE5" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Layer 1: Seamless vertical blend over the horizontal cut -->
      <rect width="${meta.width}" height="${meta.height}" fill="url(#softSeam)" />
      <!-- Layer 2: Ambient warm glow that harmonizes both zones into one unified space -->
      <rect width="${meta.width}" height="${meta.height}" fill="url(#ambientGlow)" />
    </svg>
  `);

  await sharp(bgPath)
    .composite([{ input: svgOverlay, blend: 'over' }])
    .toFile(outPath);

  // Copy to outNormal too
  await sharp(outPath).toFile(path.join(__dirname, '../public/hero-3pages-bg-blended.png'));

  // Create inspect crop around y=600 to 1400
  const cropPath = path.join(__dirname, '../public/bg-seam-smoothed-check.png');
  await sharp(outPath)
    .extract({ left: 0, top: 600, width: 1600, height: 800 })
    .toFile(cropPath);

  console.log('Successfully created seamlessly blended background image');
}

smoothTransition().catch(console.error);
