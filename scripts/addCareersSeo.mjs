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
    _key: "page-careers",
    path: "/careers",
    metaTitle: { en: "Careers — Join the Telegraph Team", ar: "الوظائف — انضم لفريق تلغراف" },
    metaDescription: {
      en: "We're building the future of Egyptian logistics — see open roles and apply to join Telegraph.",
      ar: "نبني مستقبل اللوجستيات المصرية — تصفح الوظائف المتاحة وقدّم للانضمام لفريق تلغراف.",
    },
  });
  await client.patch("seoSettings").set({ pages }).commit();
  console.log("✓ added /careers SEO entry");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
