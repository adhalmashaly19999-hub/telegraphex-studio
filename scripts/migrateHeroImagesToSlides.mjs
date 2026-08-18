import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// --- sitePage-contact: landingHero.backgroundImages[0] ---
const heroKey = "46324e1468fb";
const contactImageKey = "y52rr1yp";

await client
  .patch("sitePage-contact")
  .set({
    [`sections[_key=="${heroKey}"].backgroundImages[_key=="${contactImageKey}"]`]: {
      _key: contactImageKey,
      _type: "heroImageSlide",
      desktop: {
        _type: "image",
        asset: { _type: "reference", _ref: "image-351988cc78f6705d10273ed1004687d5ee54b8d5-2754x1536-jpg" },
      },
    },
  })
  .commit();
console.log("✓ migrated sitePage-contact hero image -> heroImageSlide");

// --- homePage: heroImages[0] ---
const homeImageKey = "b929c9a4183d";

await client
  .patch("homePage")
  .set({
    [`heroImages[_key=="${homeImageKey}"]`]: {
      _key: homeImageKey,
      _type: "heroImageSlide",
      desktop: {
        _type: "image",
        asset: { _type: "reference", _ref: "image-871f472e8fe9347c20a0ba21ece7a1f1f44791eb-1920x1080-png" },
        crop: { _type: "sanity.imageCrop", bottom: 0, left: 0, right: 0, top: 0.20915721380356306 },
        hotspot: { _type: "sanity.imageHotspot", height: 0.7908427861964369, width: 1, x: 0.5, y: 0.6045786069017816 },
      },
    },
  })
  .commit();
console.log("✓ migrated homePage hero image -> heroImageSlide");
