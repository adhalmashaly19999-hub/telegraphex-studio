import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  await client.patch("seoSettings").set({ googleAnalyticsId: "G-NQKJV3P695" }).commit();
  console.log("✓ set googleAnalyticsId on seoSettings");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
