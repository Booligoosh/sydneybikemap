import { generateSprite } from "@unvt/sprite-one";

await generateSprite(
  // Output base file name
  "public/map-icons/spritesheets/sheet",
  // Input directories
  ["public/map-icons/sprites"],
  // Pixel ratios to generate
  [1, 2, 4]
);
