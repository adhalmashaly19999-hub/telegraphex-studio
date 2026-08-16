import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Only sitePage-contact currently has a landingHero.backgroundImage set —
// move it into the new backgroundImages array and drop the old field.
const docId = "sitePage-contact";
const heroKey = "46324e1468fb";

await client
  .patch(docId)
  .setIfMissing({ [`sections[_key=="${heroKey}"].backgroundImages`]: [] })
  .insert("after", `sections[_key=="${heroKey}"].backgroundImages[-1]`, [
    { _type: "image", _key: Math.random().toString(36).slice(2, 10), asset: { _type: "reference", _ref: "image-351988cc78f6705d10273ed1004687d5ee54b8d5-2754x1536-jpg" } },
  ])
  .unset([`sections[_key=="${heroKey}"].backgroundImage`])
  .commit();

console.log(`✓ migrated ${docId} hero backgroundImage -> backgroundImages[0]`);
