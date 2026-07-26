import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  await client.createOrReplace({
    _id: "landingPage-test-campaign",
    _type: "landingPage",
    title: { en: "Test Campaign (verification only)", ar: "حملة اختبار (للتحقق فقط)" },
    slug: { _type: "slug", current: "test-campaign" },
    published: true,
    metaTitle: { en: "Test Campaign", ar: "حملة اختبار" },
    metaDescription: { en: "Verification page for the landing page builder.", ar: "صفحة تحقق لأداة إنشاء صفحات الهبوط." },
    sections: [
      {
        _type: "landingHero",
        _key: "s-hero",
        heading: { en: "Test Campaign Hero", ar: "عنوان حملة الاختبار" },
        subheading: { en: "This confirms the hero section renders correctly.", ar: "هذا يؤكد أن قسم البانر يعمل بشكل صحيح." },
        ctaLabel: { en: "Get Started", ar: "ابدأ الآن" },
        ctaLink: "/get-started",
      },
      {
        _type: "landingRichText",
        _key: "s-richtext",
        content: {
          en: [{ _type: "block", _key: "b1", style: "normal", children: [{ _type: "span", _key: "sp1", text: "This is a rich text section, verifying paragraphs render." }] }],
          ar: [{ _type: "block", _key: "b2", style: "normal", children: [{ _type: "span", _key: "sp2", text: "هذا قسم نص غني، للتحقق من عرض الفقرات." }] }],
        },
      },
      {
        _type: "landingImageText",
        _key: "s-imagetext",
        heading: { en: "Image + Text Test", ar: "اختبار صورة ونص" },
        text: { en: "Confirms the image-and-text section renders with the image on the left.", ar: "يؤكد عرض قسم الصورة والنص مع الصورة على اليسار." },
        image: { _type: "image", asset: { _ref: "image-6d500ad1cc7382546a3e5f0a5afbdb9923a43832-698x679-webp", _type: "reference" } },
        imagePosition: "left",
      },
      {
        _type: "landingFeatureGrid",
        _key: "s-features",
        heading: { en: "Feature Grid Test", ar: "اختبار شبكة الميزات" },
        items: [
          { _key: "f1", title: { en: "Feature One", ar: "الميزة الأولى" }, description: { en: "First feature works.", ar: "الميزة الأولى تعمل." } },
          { _key: "f2", title: { en: "Feature Two", ar: "الميزة الثانية" }, description: { en: "Second feature works.", ar: "الميزة الثانية تعمل." } },
        ],
      },
      {
        _type: "landingCta",
        _key: "s-cta",
        heading: { en: "CTA Banner Test", ar: "اختبار بانر الدعوة" },
        subheading: { en: "Confirms the CTA banner renders.", ar: "يؤكد عرض بانر الدعوة." },
        buttonLabel: { en: "Contact Us", ar: "تواصل معنا" },
        buttonLink: "/contact",
      },
      {
        _type: "landingFormEmbed",
        _key: "s-form",
        heading: { en: "Form Embed Test", ar: "اختبار تضمين النموذج" },
        formId: "EkrgyL",
      },
    ],
  });
  console.log("✓ seeded test landing page at /lp/test-campaign");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
