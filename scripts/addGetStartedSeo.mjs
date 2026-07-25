import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  const seoSettings = await client.getDocument("seoSettings");
  const pages = seoSettings.pages ?? [];
  pages.push({
    _type: "seoPage",
    _key: "page-get-started",
    path: "/get-started",
    metaTitle: { en: "Get Started — Create Your Free Telegraph Account", ar: "ابدأ الآن — أنشئ حسابك المجاني في تلغراف" },
    metaDescription: {
      en: "Register your business with Telegraph and our team will be in touch to set up your account.",
      ar: "سجّل عملك مع تلغراف وسيتواصل معك فريقنا لإعداد حسابك.",
    },
  });
  await client.patch("seoSettings").set({ pages }).commit();
  console.log("✓ added /get-started SEO entry");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
