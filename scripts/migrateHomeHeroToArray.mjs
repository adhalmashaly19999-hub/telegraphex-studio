import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const doc = await client.fetch(`*[_id == "homePage"][0]{heroImage}`);
if (!doc?.heroImage) {
  console.log("no heroImage set, nothing to migrate");
  process.exit(0);
}

const migratedImage = {
  ...doc.heroImage,
  _key: Math.random().toString(36).slice(2, 10),
};

await client
  .patch("homePage")
  .set({ heroImages: [migratedImage] })
  .unset(["heroImage"])
  .commit();

console.log("✓ migrated homePage.heroImage -> heroImages[0]");
