import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.resolve(__dirname, "../../app/src/assets/logos/clients");

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Same order currently shown in the marquee (ClientLogos.tsx).
const logos = [
  { slug: "alba", name: "Alba", file: "Alba.webp" },
  { slug: "artica", name: "Artica", file: "artica.webp" },
  { slug: "avens", name: "Avens", file: "avens-logo.webp" },
  { slug: "belleza", name: "Belleza Cosmetics", file: "Belleza-Cosmetics.webp" },
  { slug: "bloom-store", name: "Bloom Store", file: "Bloom-Store.webp" },
  { slug: "boon-kids", name: "BOON Kids", file: "BOON-kids.webp" },
  { slug: "cover-land", name: "Cover Land", file: "COVER-LAND.webp" },
  { slug: "cs", name: "CS", file: "cs.webp" },
  { slug: "dutti", name: "Dutti", file: "Dutti.webp" },
  { slug: "english-mix", name: "English Mix", file: "english-mix.webp" },
  { slug: "fabrico", name: "Fabrico", file: "fabrico.webp" },
  { slug: "german-mix", name: "German Mix", file: "german-mix.webp" },
  { slug: "leap", name: "Leap", file: "leap.webp" },
  { slug: "lena-fashion", name: "Lena Fashion", file: "lena-fashion.jpg" },
  { slug: "made-in-shahin", name: "Made in Shahin", file: "MADE-IN-SHAHIN-logo.webp" },
  { slug: "qz-store", name: "QZ Store", file: "qz-store.webp" },
  { slug: "spanish-mix", name: "Spanish Mix", file: "Spanish-mix.webp" },
  { slug: "stockista-store", name: "Stockista Store", file: "Stockista-Store.webp" },
  { slug: "tit-for-tat", name: "Tit for Tat", file: "tit-for-tat.webp" },
  { slug: "rifq", name: "Rifq", file: "rifq.webp" },
  { slug: "selselet-el-qema", name: "Selselet El Qema", file: "selselet-el-qema-top.webp" },
  { slug: "hera-charisma", name: "Hera Charisma", file: "hera-charisma.webp" },
];

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  for (const [i, l] of logos.entries()) {
    const logo = await uploadImage(path.join(LOGOS_DIR, l.file));
    await client.createOrReplace({
      _id: `clientLogo-${l.slug}`,
      _type: "clientLogo",
      name: l.name,
      logo,
      order: i + 1,
    });
  }
  console.log(`✓ seeded ${logos.length} client logos`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
