import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const SOURCE_DIR = "C:/Users/adhal/Downloads/Telegraph/loges 2026-20260723T015206Z-1-001/loges 2026";
const SCRATCH_DIR = "C:/Users/adhal/AppData/Local/Temp/claude/c--Users-adhal/532b13ed-0431-4159-9630-d034580127ae/scratchpad";

const logos = [
  { slug: "alya", name: "ALYA", file: path.join(SOURCE_DIR, "ALYA 1677.jpg") },
  { slug: "elbatool-cosmetics", name: "Elbatool Cosmetics", file: path.join(SOURCE_DIR, "Batool 2025.jpg") },
  { slug: "bella-store", name: "Bella Store", file: path.join(SOURCE_DIR, "Bella Store_2013.jpg") },
  { slug: "exclusive-designs", name: "Exclusive Designs", file: path.join(SOURCE_DIR, "exclud 1540.jpg") },
  { slug: "glovive", name: "Glovive", file: path.join(SCRATCH_DIR, "glovive-logo-resized.png") },
  { slug: "diva-cosmetics", name: "Diva Cosmetics", file: path.join(SOURCE_DIR, "LOGO DIVA COSMETICS (5).png") },
  { slug: "minister-fitness", name: "Minister Fitness", file: path.join(SOURCE_DIR, "minister fitness  1930.jpg") },
  { slug: "zooba", name: "Zooba", file: path.join(SOURCE_DIR, "Primo Portal_.jpg") },
  { slug: "tali-designs", name: "Tali Designs", file: path.join(SOURCE_DIR, "Tali designs 1598.jpg") },
  { slug: "zuha", name: "Zuha", file: path.join(SOURCE_DIR, "Zuha Store1892.jpg") },
  { slug: "eladawy-medical", name: "Eladawy for Medical Supplies", file: path.join(SOURCE_DIR, "العدوي ميديكال للتوريدات الطبيه.jpg") },
];

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  const startOrder = 23;
  for (const [i, l] of logos.entries()) {
    const logo = await uploadImage(l.file);
    await client.createOrReplace({
      _id: `clientLogo-${l.slug}`,
      _type: "clientLogo",
      name: l.name,
      logo,
      order: startOrder + i,
    });
    console.log(`✓ ${l.name}`);
  }
  console.log(`✓ seeded ${logos.length} new client logos`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
