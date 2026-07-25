import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Mirrors the previous hardcoded content in app/src/components/shared/MetaInjector.tsx —
// migrated as-is so nothing changes on first deploy of the Sanity-backed version.
const pages = [
  {
    path: "/",
    metaTitle: { en: "Telegraph — Egypt's Smart Logistics Platform", ar: "تلغراف — منصة اللوجستيات الذكية في مصر" },
    metaDescription: {
      en: "Real-time shipping, AI-powered routing, and flexible payments for Egyptian businesses. Move Forward. Always.",
      ar: "شحن لحظي، توجيه مدعوم بالذكاء الاصطناعي، ومدفوعات مرنة للشركات المصرية.",
    },
  },
  {
    path: "/about",
    metaTitle: { en: "About Telegraph — Building the Future of Egyptian Logistics", ar: "عن تلغراف — نبني مستقبل اللوجستيات المصرية" },
    metaDescription: {
      en: "Born in Cairo, built for Egypt. Learn about our mission to transform last-mile delivery across the country.",
      ar: "ولدنا في القاهرة، بنينا لمصر. تعرف على مهمتنا في تطوير التوصيل في جميع أنحاء البلاد.",
    },
  },
  {
    path: "/services",
    metaTitle: { en: "Services — Everything Your Business Needs to Ship", ar: "الخدمات — كل ما يحتاجه عملك للشحن" },
    metaDescription: {
      en: "From real-time tracking to flexible payment collection — one platform, complete control.",
      ar: "من التتبع اللحظي إلى تحصيل المدفوعات المرن — منصة واحدة، تحكم كامل.",
    },
  },
  {
    path: "/coverage",
    metaTitle: { en: "Coverage — Nationwide Delivery Across Egypt", ar: "التغطية — توصيل في جميع أنحاء مصر" },
    metaDescription: {
      en: "From Alexandria to Aswan — Telegraph delivers to all 27 governorates across Egypt.",
      ar: "من الإسكندرية إلى أسوان — تلغراف يوصل لجميع محافظات مصر الـ27.",
    },
  },
  {
    path: "/branches",
    metaTitle: { en: "Branches — Find a Telegraph Location Near You", ar: "الفروع — اعثر على فرع تلغراف بالقرب منك" },
    metaDescription: {
      en: "Visit one of our branches across Cairo, Alexandria, Giza, and more.",
      ar: "زر أحد فروعنا في القاهرة والإسكندرية والجيزة وأكثر.",
    },
  },
  {
    path: "/pricing",
    metaTitle: { en: "Pricing — Simple, Transparent Shipping Rates", ar: "الأسعار — تسعير بسيط وشفاف" },
    metaDescription: {
      en: "No hidden fees, no surprises. Pay for what you ship — and keep more of your margin.",
      ar: "لا رسوم خفية، لا مفاجآت. ادفع مقابل ما تشحنه واحتفظ بهامش ربح أكبر.",
    },
  },
  {
    path: "/track",
    metaTitle: { en: "Track Your Shipment — Real-Time Tracking", ar: "تتبع شحنتك — تتبع لحظي" },
    metaDescription: {
      en: "Track your shipment live from pickup to delivery with Telegraph.",
      ar: "تتبع شحنتك لحظياً من الاستلام حتى التسليم مع تلغراف.",
    },
  },
  {
    path: "/contact",
    metaTitle: { en: "Contact — Get in Touch with Telegraph", ar: "تواصل معنا — تواصل مع تلغراف" },
    metaDescription: {
      en: "Our team is ready to help you ship smarter. Reach out today.",
      ar: "فريقنا جاهز لمساعدتك في الشحن بذكاء. تواصل معنا اليوم.",
    },
  },
  {
    path: "/news",
    metaTitle: { en: "News & Updates — Telegraph", ar: "الأخبار والتحديثات — تلغراف" },
    metaDescription: {
      en: "The latest from Telegraph — announcements, service updates, and stories.",
      ar: "آخر أخبار تلغراف وتحديثات الخدمة.",
    },
  },
  {
    path: "/faq",
    metaTitle: { en: "FAQ — Frequently Asked Questions", ar: "الأسئلة الشائعة" },
    metaDescription: {
      en: "Everything you need to know about shipping with Telegraph.",
      ar: "كل ما تحتاج معرفته عن الشحن مع تلغراف.",
    },
  },
  {
    path: "/privacy",
    metaTitle: { en: "Privacy Policy — Telegraph", ar: "سياسة الخصوصية — تلغراف" },
    metaDescription: {
      en: "How Telegraph collects, uses, and protects your personal information.",
      ar: "كيف يجمع تلغراف بياناتك الشخصية ويستخدمها ويحميها.",
    },
  },
  {
    path: "/terms",
    metaTitle: { en: "Terms of Service — Telegraph", ar: "شروط الخدمة — تلغراف" },
    metaDescription: {
      en: "The terms and conditions governing your use of Telegraph services.",
      ar: "الشروط والأحكام التي تحكم استخدامك لخدمات تلغراف.",
    },
  },
];

async function seedSeoSettings() {
  await client.createOrReplace({
    _id: "seoSettings",
    _type: "seoSettings",
    siteName: "Telegraph",
    pages: pages.map((p, i) => ({ _type: "seoPage", _key: `page-${i}`, ...p })),
  });
  console.log(`✓ seoSettings (${pages.length} pages)`);
}

seedSeoSettings().catch((err) => {
  console.error(err);
  process.exit(1);
});
