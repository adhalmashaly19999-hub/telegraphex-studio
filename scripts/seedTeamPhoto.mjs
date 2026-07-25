import { createClient } from "@sanity/client";
import fs from "fs";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const TEAM_PHOTO_PATH =
  "C:/Users/adhal/AppData/Local/Temp/claude/c--Users-adhal/532b13ed-0431-4159-9630-d034580127ae/scratchpad/team-photo-resized.jpg";

const fakeTeamMemberIds = [
  "teamMember-ahmed-hassan",
  "teamMember-nour-el-din",
  "teamMember-layla-mahmoud",
  "teamMember-omar-fathi",
];

async function run() {
  const buffer = fs.readFileSync(TEAM_PHOTO_PATH);
  const asset = await client.assets.upload("image", buffer, { filename: "team-photo.jpg" });
  await client.patch("aboutPage").set({
    teamPhoto: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  }).commit();
  console.log("✓ team photo added to aboutPage");

  for (const id of fakeTeamMemberIds) {
    await client.delete(id);
  }
  console.log(`✓ removed ${fakeTeamMemberIds.length} placeholder team members`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
