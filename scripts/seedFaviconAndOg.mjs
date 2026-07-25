import { createClient } from "@sanity/client";
import fs from "fs";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const FAVICON_PATH = "C:/tmp/favicon-512.png";
const HERO_IMAGE_PATH = "C:/Users/adhal/Downloads/Kimi_Agent_Telegraph Front-End Prototype/app/src/assets/hero-truck.webp";

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename: filePath.split(/[\\/]/).pop() });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  const favicon = await uploadImage(FAVICON_PATH);
  const defaultOgImage = await uploadImage(HERO_IMAGE_PATH);

  await client.patch("seoSettings").set({ favicon, defaultOgImage }).commit();
  console.log("✓ favicon and defaultOgImage set on seoSettings");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
