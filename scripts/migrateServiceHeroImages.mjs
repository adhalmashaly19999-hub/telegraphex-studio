import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const targets = [
  {
    docId: "service-domestic-shipping",
    imageKey: "94b3d4786987",
    assetRef: "image-be8e34319a1ea7dacfae04089cea41cd866c6747-1600x441-jpg",
    crop: { _type: "sanity.imageCrop", bottom: 0, left: 0, right: 0, top: 0 },
    hotspot: { _type: "sanity.imageHotspot", height: 1, width: 1, x: 0.5, y: 0.5 },
  },
  {
    docId: "service-international-shipping",
    imageKey: "305e66522193",
    assetRef: "image-c5dacd39b2c00380dd7f42cf69da9f3ab0ab9a34-1600x700-jpg",
    crop: { _type: "sanity.imageCrop", bottom: 0, left: 0, right: 0, top: 0 },
    hotspot: { _type: "sanity.imageHotspot", height: 1, width: 1, x: 0.5, y: 0.5 },
  },
];

for (const t of targets) {
  await client
    .patch(t.docId)
    .set({
      [`heroImages[_key=="${t.imageKey}"]`]: {
        _key: t.imageKey,
        _type: "heroImageSlide",
        desktop: {
          _type: "image",
          asset: { _type: "reference", _ref: t.assetRef },
          crop: t.crop,
          hotspot: t.hotspot,
        },
      },
    })
    .commit();
  console.log(`✓ migrated ${t.docId} heroImages -> heroImageSlide`);
}
