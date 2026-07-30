import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const OLD_IDS = [
  "aboutPage",
  "servicesPage",
  "careersPage",
  "getStartedPage",
  "contactPage",
  "branchesPage",
  "privacyPage",
  "termsPage",
];

async function run() {
  for (const id of OLD_IDS) {
    await client.delete(id);
    console.log(`✓ deleted ${id}`);
  }
  console.log("done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
