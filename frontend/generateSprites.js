import { generateSprite } from "@unvt/sprite-one";

await generateSprite(
  // Output base file name
  "static/map-icons/spritesheets/sheet",
  // Input directories
  ["static/map-icons/sprites"],
  // Pixel ratios to generate
  [1, 2, 4],
);
