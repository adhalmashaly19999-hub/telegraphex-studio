import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const oldServiceIds = [
  "service-real-time-tracking",
  "service-flexible-payment-collection",
  "service-ai-powered-routing",
  "service-warehouse-fulfillment",
  "service-return-management",
  "service-analytics-dashboard",
];

// Mirrors the current live services. Slugs map to the brand's 3D renders in
// app/src/lib/serviceImages.ts (domestic/international/warehouses/shipment
// types show renders; the rest fall back to icon tiles). Colors follow the
// brand book's iconography rule: white on red, or red/white on black.
const services = [
  {
    slug: "domestic-shipping",
    icon: "MapPin",
    color: "red",
    order: 1,
    showOnHome: true,
    title: { en: "Domestic Shipping", ar: "شحن محلي" },
    desc: {
      en: "Fast, reliable delivery to every corner of Egypt — from same-day city drops to nationwide reach.",
      ar: "توصيل سريع وموثوق إلى كل ركن في مصر — من التسليم في نفس اليوم داخل المدينة إلى التغطية على مستوى الجمهورية.",
    },
    features: [
      { en: "Same-day & next-day delivery", ar: "توصيل في نفس اليوم واليوم التالي" },
      { en: "Nationwide governorate coverage", ar: "تغطية جميع المحافظات" },
      { en: "Cash on delivery collection", ar: "تحصيل الدفع عند الاستلام" },
      { en: "Real-time tracking", ar: "تتبع لحظي" },
    ],
  },
  {
    slug: "international-shipping",
    icon: "Globe",
    color: "black",
    order: 2,
    showOnHome: true,
    title: { en: "International Shipping", ar: "شحن دولي" },
    desc: {
      en: "Send shipments across borders with customs handling and delivery partners worldwide.",
      ar: "أرسل شحناتك خارج الحدود مع التعامل مع الجمارك وشركاء توصيل حول العالم.",
    },
    features: [
      { en: "Customs clearance support", ar: "دعم التخليص الجمركي" },
      { en: "Global delivery partners", ar: "شركاء توصيل عالميون" },
      { en: "Door-to-door international delivery", ar: "توصيل دولي من الباب للباب" },
      { en: "Shipment tracking across borders", ar: "تتبع الشحنات عبر الحدود" },
    ],
  },
  {
    slug: "warehouses-storage",
    icon: "Package",
    color: "red",
    order: 3,
    showOnHome: true,
    title: { en: "Warehouses & Storage", ar: "مستودعات و مخازن" },
    desc: {
      en: "Store your inventory safely in our facilities and ship straight from stock when orders come in.",
      ar: "خزّن مخزونك بأمان في مرافقنا واشحن مباشرة من المخزون عند وصول الطلبات.",
    },
    features: [
      { en: "Secure inventory storage", ar: "تخزين آمن للمخزون" },
      { en: "Pick-and-pack fulfillment", ar: "خدمة التقاط وتعبئة الطلبات" },
      { en: "Real-time stock visibility", ar: "رؤية لحظية للمخزون" },
      { en: "Bulk shipment creation", ar: "إنشاء شحنات بالجملة" },
    ],
  },
  {
    slug: "api-integration",
    icon: "Code2",
    color: "red",
    order: 4,
    showOnHome: false,
    title: { en: "API Integration", ar: "تكامل API" },
    desc: {
      en: "Plug Telegraph directly into your store or system with a developer-friendly API.",
      ar: "اربط تليجراف مباشرة بمتجرك أو نظامك عبر واجهة برمجية سهلة للمطورين.",
    },
    features: [
      { en: "REST API for shipment creation", ar: "واجهة برمجية لإنشاء الشحنات" },
      { en: "Real-time status webhooks", ar: "إشعارات فورية لحالة الشحنة" },
      { en: "E-commerce platform plugins", ar: "إضافات لمنصات التجارة الإلكترونية" },
      { en: "Sandbox testing environment", ar: "بيئة اختبار تجريبية" },
    ],
  },
  {
    slug: "analytics-reports",
    icon: "BarChart3",
    color: "black",
    order: 5,
    showOnHome: false,
    title: { en: "Analytics & Reports", ar: "تحليلات وتقارير" },
    desc: {
      en: "Understand your shipping performance with clear, actionable data.",
      ar: "افهم أداء شحناتك من خلال بيانات واضحة وقابلة للتنفيذ.",
    },
    features: [
      { en: "Delivery success rates", ar: "معدلات نجاح التسليم" },
      { en: "Courier performance scores", ar: "درجات أداء المندوبين" },
      { en: "Revenue tracking", ar: "تتبع الإيرادات" },
      { en: "Customer satisfaction trends", ar: "اتجاهات رضا العملاء" },
    ],
  },
  {
    slug: "shipment-types",
    icon: "Layers",
    color: "black",
    order: 6,
    showOnHome: false,
    title: { en: "Shipment Types", ar: "انواع الشحنات" },
    desc: {
      en: "From documents to bulky freight — choose the shipment type that fits what you're sending.",
      ar: "من المستندات إلى الشحنات الكبيرة — اختر نوع الشحنة المناسب لما ترسله.",
    },
    features: [
      { en: "Documents & parcels", ar: "مستندات وطرود" },
      { en: "Bulky & heavy freight", ar: "شحنات كبيرة وثقيلة" },
      { en: "Fragile item handling", ar: "التعامل مع المواد القابلة للكسر" },
      { en: "Temperature-sensitive goods", ar: "بضائع حساسة لدرجة الحرارة" },
    ],
  },
];

async function run() {
  for (const id of oldServiceIds) {
    await client.delete(id).catch(() => {});
  }
  console.log(`✓ removed up to ${oldServiceIds.length} old services`);

  for (const s of services) {
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      icon: s.icon,
      color: s.color,
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      desc: s.desc,
      order: s.order,
      showOnHome: s.showOnHome,
      features: s.features.map((f, i) => ({ _type: "localeString", _key: `f-${i}`, ...f })),
    });
  }
  console.log(`✓ seeded ${services.length} services`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
