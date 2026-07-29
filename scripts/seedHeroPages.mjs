import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const loc = (en, ar) => ({ en, ar });

async function run() {
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroHeading: loc("Get in Touch", "تواصل معنا"),
    heroSubheading: loc("Our team is ready to help you ship smarter.", "فريقنا جاهز لمساعدتك في الشحن بذكاء."),
    heroBackground: "black",
  });
  console.log("✓ seeded contactPage");

  await client.createOrReplace({
    _id: "trackPage",
    _type: "trackPage",
    heroEyebrow: loc("Real-time tracking", "تتبع لحظي"),
    heroHeading: loc("Track Your Shipment", "تتبع شحنتك"),
    heroBackground: "black",
  });
  console.log("✓ seeded trackPage");

  await client.createOrReplace({
    _id: "branchesPage",
    _type: "branchesPage",
    heroHeading: loc("Our Branches", "فروعنا"),
    heroSubheading: loc("Find a Telegraph branch near you.", "اعثر على فرع تلغراف بالقرب منك."),
    heroBackground: "black",
  });
  console.log("✓ seeded branchesPage");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
