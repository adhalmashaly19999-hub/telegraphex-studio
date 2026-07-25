import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  const tierIds = ["pricingTier-starter", "pricingTier-growth", "pricingTier-enterprise"];
  for (const id of tierIds) {
    await client.delete(id);
  }
  console.log(`✓ removed ${tierIds.length} pricingTier documents`);

  const seoSettings = await client.getDocument("seoSettings");
  const filteredPages = (seoSettings.pages ?? []).filter((p) => p.path !== "/pricing");
  await client.patch("seoSettings").set({ pages: filteredPages }).commit();
  console.log("✓ removed /pricing entry from seoSettings");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
