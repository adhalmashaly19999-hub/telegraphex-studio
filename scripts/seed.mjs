import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_LOGOS_DIR = path.resolve(
  __dirname,
  "../../app/src/assets/logos/clients"
);

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const imageAssetCache = new Map();

async function uploadImage(filePath) {
  if (imageAssetCache.has(filePath)) return imageAssetCache.get(filePath);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  imageAssetCache.set(filePath, ref);
  return ref;
}

async function seedHomePage() {
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroTitle: { en: "Move Forward. Always.", ar: "!تحرك إلى الأمام. دائماً" },
    heroSubtitle: {
      en: "With Telegraph, enjoy fast shipping, real-time tracking, and round-the-clock customer support — all at competitive prices.",
      ar: "مع تليجراف، استمتع بخدمة شحن سريعة، تتبع لحظي، ودعم عملاء متواصل — بأسعار منافسة.",
    },
    servicesHeading: {
      en: "Everything Your Business Needs to Ship",
      ar: "كل ما يحتاجه عملك للشحن",
    },
    servicesSubtitle: {
      en: "From real-time tracking to flexible payment collection — one platform, complete control.",
      ar: "من التتبع الفوري إلى تحصيل المدفوعات المرن — منصة واحدة، تحكم كامل.",
    },
    whyHeading: {
      en: "Why Egyptian Merchants Choose Telegraph",
      ar: "لماذا يختار التجار المصريون تلغراف",
    },
    whySubtitle: {
      en: "We built Telegraph because Egyptian businesses deserve logistics technology that actually works for their reality.",
      ar: "بنينا تلغراف لأن الشركات المصرية تستحق تقنية لوجستية تعمل فعلياً لواقعهم.",
    },
    whyFeatures: [
      {
        _type: "whyFeature",
        _key: "same-day-pickup",
        icon: "Zap",
        title: { en: "Same-Day Pickup", ar: "استلام في نفس اليوم" },
        desc: {
          en: "Create your shipment before 12 PM and we'll pick it up from your location that same day.",
          ar: "أنشئ شحنتك قبل الساعة ١٢ ظهراً، ويسعدنا الوصول لاستلامها من مقرك في نفس اليوم.",
        },
      },
      {
        _type: "whyFeature",
        _key: "next-day-delivery",
        icon: "Clock",
        title: { en: "Next-Day Delivery", ar: "التوصيل في اليوم التالي" },
        desc: {
          en: "We promise next-day delivery for pickups, depending on the destination city.",
          ar: "نعدك بتسليم الشحنة في اليوم التالي، اعتماداً على موقع التسليم في المدينة.",
        },
      },
      {
        _type: "whyFeature",
        _key: "flexible-cash-collection",
        icon: "CreditCard",
        title: { en: "Flexible Cash Collection", ar: "تحصيل نقدي مرن" },
        desc: {
          en: "Bank transfer, e-payment, branch pickup, or straight from our courier — however works for you.",
          ar: "تحويل بنكي، دفع إلكتروني، استلام من الفروع، أو نقداً من المندوب — كما يناسبك.",
        },
      },
      {
        _type: "whyFeature",
        _key: "free-storage",
        icon: "Package",
        title: { en: "Free Storage", ar: "تخزين مجاني" },
        desc: {
          en: "We store your products free of charge and ship the moment you notify us of a shipment.",
          ar: "نخزن منتجاتك مجاناً ونشحنها فور إبلاغنا بوجود شحنة.",
        },
      },
      {
        _type: "whyFeature",
        _key: "fast-returns",
        icon: "RotateCcw",
        title: { en: "Fast Customer Returns", ar: "مرتجعات سريعة" },
        desc: {
          en: "We process and return customer shipments as quickly as possible.",
          ar: "نتولى استرجاع شحنات العملاء في أسرع وقت ممكن.",
        },
      },
      {
        _type: "whyFeature",
        _key: "shipment-replacement",
        icon: "ArrowLeftRight",
        title: { en: "Shipment Replacement", ar: "استبدال الشحنات" },
        desc: {
          en: "Senders can activate a package-for-package exchange directly with the recipient.",
          ar: "يمكن للراسل تفعيل خيار استبدال الشحنة مع المرسل إليه، طرد مقابل طرد.",
        },
      },
    ],
    coverageHeading: {
      en: "We Cover Every Corner of Egypt",
      ar: "نغطي كل ركن في مصر",
    },
  });
  console.log("✓ homePage");
}

async function seedAboutPage() {
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: {
      en: "Building the Future of Egyptian Logistics",
      ar: "نبني مستقبل اللوجستيات المصرية",
    },
    heroSubtitle: {
      en: "Born in Cairo, built for Egypt. Telegraph is a technology company first — logistics is what our software enables.",
      ar: "ولدنا في القاهرة، بنينا لمصر. تلغراف شركة تقنية أولاً — اللوجستيات هي ما يمكّنه برنامجنا.",
    },
    storyHeading: {
      en: "From a Single Branch to a National Network",
      ar: "من فرع واحد إلى شبكة وطنية",
    },
    storyParagraphs: [
      {
        _type: "localeText",
        _key: "story-1",
        en: "Telegraph started in 2018 with one simple observation: Egyptian e-commerce was growing fast, but the logistics infrastructure wasn't keeping up.",
        ar: "بدأ تلغراف في 2018 بملاحظة بسيطة: التجارة الإلكترونية المصرية كانت تنمو بسرعة، لكن البنية التحتية اللوجستية لم تكن تواكب.",
      },
      {
        _type: "localeText",
        _key: "story-2",
        en: "So we built what we wished existed — a shipping platform designed specifically for the Egyptian market.",
        ar: "فبنينا ما كنا نتمنى وجوده — منصة شحن مصممة خصيصاً للسوق المصري.",
      },
    ],
    valuesHeading: { en: "What We Stand For", ar: "ما نقف من أجله" },
    values: [
      {
        _type: "value",
        _key: "speed",
        title: { en: "Speed Without Compromise", ar: "السرعة دون مساومة" },
        desc: {
          en: "We move fast — but never at the expense of accuracy or care.",
          ar: "نتحرك بسرعة — لكن أبداً على حساب الدقة أو العناية.",
        },
      },
      {
        _type: "value",
        _key: "transparency",
        title: { en: "Radical Transparency", ar: "شفافية جذرية" },
        desc: {
          en: "No hidden fees, no black boxes. Our merchants see exactly what we see.",
          ar: "لا رسوم خفية، لا صناديق سوداء. تجارنا يرون بالضبط ما نراه.",
        },
      },
      {
        _type: "value",
        _key: "local",
        title: { en: "Local Ownership", ar: "ملكية محلية" },
        desc: {
          en: "We're Egyptian. We hire Egyptian. We solve Egyptian problems.",
          ar: "نحن مصريون. نوظف مصريين. نحل مشاكل مصرية.",
        },
      },
    ],
    teamHeading: {
      en: "The People Behind the Platform",
      ar: "الأشخاص وراء المنصة",
    },
  });
  console.log("✓ aboutPage");
}

async function seedServices() {
  const services = [
    {
      slug: "real-time-tracking", icon: "MapPin", color: "red", order: 1, showOnHome: true,
      title: { en: "Real-Time Tracking", ar: "تتبع فوري" },
      desc: { en: "Know exactly where every shipment is at every moment.", ar: "اعرف بالضبط مكان كل شحنة في كل لحظة." },
      features: [
        { en: "GPS live location", ar: "موقع GPS مباشر" },
        { en: "Customer-facing tracking link", ar: "رابط تتبع للعملاء" },
        { en: "Automated status SMS", ar: "رسائل SMS تلقائية" },
        { en: "Delivery photo confirmation", ar: "تأكيد التسليم بصورة" },
      ],
    },
    {
      slug: "flexible-payment-collection", icon: "Banknote", color: "white", order: 2, showOnHome: true,
      title: { en: "Flexible Payment Collection", ar: "تحصيل مدفوعات مرن" },
      desc: { en: "Collect however your customers want to pay.", ar: "اجمع كما يفضل عملاؤك الدفع." },
      features: [
        { en: "Cash on delivery", ar: "الدفع عند الاستلام" },
        { en: "Credit/debit card", ar: "بطاقة ائتمان/خصم" },
        { en: "Mobile wallet", ar: "محفظة محمولة" },
        { en: "Weekly bank settlement", ar: "تسوية بنكية أسبوعية" },
      ],
    },
    {
      slug: "ai-powered-routing", icon: "Route", color: "black", order: 3, showOnHome: true,
      title: { en: "AI-Powered Routing", ar: "توجيه مدعوم بالذكاء الاصطناعي" },
      desc: { en: "Smart routes that adapt to real-world conditions.", ar: "مسارات ذكية تتكيف مع الظروف الحقيقية." },
      features: [
        { en: "Dynamic route optimization", ar: "تحسين المسار الديناميكي" },
        { en: "Traffic-aware scheduling", ar: "جدولة مراعية لحركة المرور" },
        { en: "Delivery density clustering", ar: "تجميع كثافة التوصيل" },
        { en: "Fuel-efficient dispatch", ar: "إرسال موفر للوقود" },
      ],
    },
    {
      slug: "warehouse-fulfillment", icon: "Package", color: "red", order: 4, showOnHome: false,
      title: { en: "Warehouse & Fulfillment", ar: "مستودع وإيفاء" },
      desc: { en: "Store, pack, and ship from our facilities.", ar: "خزن، العبأ، واشحن من مرافقنا." },
      features: [
        { en: "Inventory management", ar: "إدارة المخزون" },
        { en: "Pick-and-pack service", ar: "خدمة الالتقاط والتعبئة" },
        { en: "Quality inspection", ar: "فحص الجودة" },
        { en: "Bulk shipment creation", ar: "إنشاء شحنات بالجملة" },
      ],
    },
    {
      slug: "return-management", icon: "RotateCcw", color: "black", order: 5, showOnHome: false,
      title: { en: "Return Management", ar: "إدارة المرتجعات" },
      desc: { en: "Hassle-free reverse logistics.", ar: "لوجستيات عكسية سلسة." },
      features: [
        { en: "Scheduled return pickup", ar: "استلام مرتجعات مجدول" },
        { en: "Condition inspection", ar: "فحص الحالة" },
        { en: "Customer refund coordination", ar: "تنسيق استرداد العملاء" },
        { en: "Restocking workflow", ar: "سير عمل إعادة التخزين" },
      ],
    },
    {
      slug: "analytics-dashboard", icon: "BarChart3", color: "white", order: 6, showOnHome: false,
      title: { en: "Analytics Dashboard", ar: "لوحة تحليلات" },
      desc: { en: "Data that helps you ship smarter.", ar: "بيانات تساعدك على الشحن بذكاء." },
      features: [
        { en: "Delivery success rates", ar: "معدلات نجاح التسليم" },
        { en: "Courier performance scores", ar: "درجات أداء المندوبين" },
        { en: "Revenue tracking", ar: "تتبع الإيرادات" },
        { en: "Customer satisfaction trends", ar: "اتجاهات رضا العملاء" },
      ],
    },
  ];

  for (const s of services) {
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      icon: s.icon,
      color: s.color,
      title: s.title,
      desc: s.desc,
      order: s.order,
      showOnHome: s.showOnHome,
      features: s.features.map((f, i) => ({ _type: "localeString", _key: `f-${i}`, ...f })),
    });
  }
  console.log(`✓ ${services.length} services`);
}

async function seedPricingTiers() {
  const tiers = [
    {
      slug: "starter", order: 1, featured: false, ctaType: "login",
      name: { en: "Starter", ar: "البداية" },
      price: { en: "Free", ar: "مجاني" },
      period: { en: "", ar: "" },
      desc: { en: "Perfect for businesses just getting started with shipping.", ar: "مثالي للشركات التي تبدأ للتو في الشحن." },
      features: [
        { en: "Up to 50 shipments/month", ar: "حتى 50 شحنة/شهر" },
        { en: "Real-time tracking", ar: "تتبع فوري" },
        { en: "Cash on delivery collection", ar: "تحصيل الدفع عند الاستلام" },
        { en: "Basic analytics dashboard", ar: "لوحة تحليلات أساسية" },
        { en: "Email support", ar: "دعم بالبريد الإلكتروني" },
      ],
    },
    {
      slug: "growth", order: 2, featured: true, ctaType: "login",
      name: { en: "Growth", ar: "النمو" },
      price: { en: "EGP 499", ar: "EGP 499" },
      period: { en: "/month", ar: "/شهر" },
      desc: { en: "For growing businesses shipping regularly across Egypt.", ar: "للشركات النامية التي تشحن بانتظام عبر مصر." },
      features: [
        { en: "Everything in Starter", ar: "كل شيء في البداية" },
        { en: "Unlimited shipments", ar: "شحنات غير محدودة" },
        { en: "Priority courier assignment", ar: "تخصيص مندوب أولوية" },
        { en: "Weekly bank settlements", ar: "تسويات بنكية أسبوعية" },
        { en: "Advanced analytics", ar: "تحليلات متقدمة" },
        { en: "Dedicated account manager", ar: "مدير حساب مخصص" },
        { en: "API access", ar: "وصول API" },
      ],
    },
    {
      slug: "enterprise", order: 3, featured: false, ctaType: "contact",
      name: { en: "Enterprise", ar: "المؤسسات" },
      price: { en: "Custom", ar: "مخصص" },
      period: { en: "", ar: "" },
      desc: { en: "High-volume merchants with custom logistics needs.", ar: "للتجار عاليي الحجم مع احتياجات لوجستية مخصصة." },
      features: [
        { en: "Everything in Growth", ar: "كل شيء في النمو" },
        { en: "Volume-based pricing", ar: "تسعير حسب الحجم" },
        { en: "Custom integrations", ar: "تكاملات مخصصة" },
        { en: "White-label tracking pages", ar: "صفحات تتبع بعلامتك التجارية" },
        { en: "Multi-branch management", ar: "إدارة فروع متعددة" },
        { en: "SLA guarantees", ar: "ضمانات SLA" },
        { en: "24/7 phone support", ar: "دعم هاتفي 24/7" },
      ],
    },
  ];

  for (const t of tiers) {
    await client.createOrReplace({
      _id: `pricingTier-${t.slug}`,
      _type: "pricingTier",
      name: t.name,
      price: t.price,
      period: t.period,
      desc: t.desc,
      featured: t.featured,
      ctaType: t.ctaType,
      order: t.order,
      features: t.features.map((f, i) => ({ _type: "localeString", _key: `f-${i}`, ...f })),
    });
  }
  console.log(`✓ ${tiers.length} pricing tiers`);
}

async function seedFaqs() {
  const faqsPath = path.resolve(__dirname, "../../app/src/data/faqs.json");
  const faqs = JSON.parse(fs.readFileSync(faqsPath, "utf8"));
  for (const [i, faq] of faqs.entries()) {
    await client.createOrReplace({
      _id: `faqItem-${faq.id}`,
      _type: "faqItem",
      question: { en: faq.question, ar: faq.questionAr },
      answer: { en: faq.answer, ar: faq.answerAr },
      order: i + 1,
    });
  }
  console.log(`✓ ${faqs.length} FAQ items`);
}

async function seedBranches() {
  const branchesPath = path.resolve(__dirname, "../../app/src/data/branches.json");
  const branches = JSON.parse(fs.readFileSync(branchesPath, "utf8"));
  for (const [i, b] of branches.entries()) {
    await client.createOrReplace({
      _id: `branch-${b.id}`,
      _type: "branch",
      name: { en: b.name, ar: b.nameAr },
      address: { en: b.address, ar: b.addressAr },
      governorate: { en: b.governorate, ar: b.governorateAr },
      city: { en: b.city, ar: b.cityAr },
      phone: b.phone,
      hours: { en: b.hours, ar: b.hoursAr },
      isMain: b.isMain,
      lat: b.lat,
      lng: b.lng,
      order: i + 1,
    });
  }
  console.log(`✓ ${branches.length} branches`);
}

async function seedTeamMembers() {
  const team = [
    { slug: "ahmed-hassan", name: "Ahmed Hassan", role: { en: "CEO & Co-Founder", ar: "الرئيس التنفيذي" } },
    { slug: "nour-el-din", name: "Nour El-Din", role: { en: "CTO & Co-Founder", ar: "رئيس التكنولوجيا" } },
    { slug: "layla-mahmoud", name: "Layla Mahmoud", role: { en: "Head of Operations", ar: "رئيسة العمليات" } },
    { slug: "omar-fathi", name: "Omar Fathi", role: { en: "Head of Business Development", ar: "رئيس التطوير" } },
  ];
  for (const [i, m] of team.entries()) {
    await client.createOrReplace({
      _id: `teamMember-${m.slug}`,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      order: i + 1,
    });
  }
  console.log(`✓ ${team.length} team members`);
}

async function seedTestimonials() {
  const testimonials = [
    { slug: "rifq", name: "Rifq", logoFile: "rifq.webp", quoteEn: "Heartfelt thanks from Rifq to our outstanding partners at Telegraph. We're truly proud of our collaboration — your fast, accurate service makes things so much easier for us and our customers. Always better together.", quoteAr: "💌 شكر من القلب من شركة رفق لشركائنا المميزين في تليجراف للشحن 🚚💨 بجد فخورين بتعاونكم معانا، وسرعة خدماتكم ودقتكم اللي بتسهل علينا وعلى عملائنا كتير ❤️ دايمًا مع بعض للأحسن 🌟" },
    { slug: "cover-land", name: "Cover Land", logoFile: "COVER-LAND.webp", quoteEn: "After trying more than 20 shipping companies, I believe Telegraph is among the best because they're constantly improving and fixing the kind of issues every shipping brand faces. God willing, this progress continues — because in the end, it's progress for us too.", quoteAr: "بعد تجربة اكتر من ٢٠ شركة شحن اعتقد ان تليجراف من افضل الشركات بسبب انهم دايمآ في تطور مستمر وتصحيح للأخطاء الموجودة في كل الشركات. بإذن الله حالة التطوير دي تستمر لانه في الاخر هو تطور لينا احنا كمان." },
    { slug: "boon-kids", name: "BOON Kids", logoFile: "BOON-kids.webp", quoteEn: "At Boon Kids, we believe great care deserves great delivery — and that's exactly what our trusted partner, Telegraph, brings to our customers every day. Thank you for your speed, reliability, and dedication.", quoteAr: "في بون كيدز، بنؤمن ان الاهتمام الحقيقي يستحق توصيل حقيقي — وده بالظبط اللي بيقدمه شريكنا الموثوق تليجراف لعملائنا كل يوم. شكراً على سرعتكم والتزامكم." },
    { slug: "made-in-shahin", name: "Made in Shahin", logoFile: "MADE-IN-SHAHIN-logo.webp", quoteEn: "Working with Telegraph has been a smooth and reliable experience. Their fast delivery, professional communication, and commitment to quality make them a trusted partner. We look forward to continued success together.", quoteAr: "التعامل مع تليجراف كان تجربة سلسة وموثوقة. سرعة التوصيل والتواصل الاحترافي والالتزام بالجودة يخليهم شريك موثوق، ونتطلع لاستمرار النجاح مع بعض." },
    { slug: "dutti", name: "Dutti", logoFile: "Dutti.webp", quoteEn: "I've been working with Telegraph for four years now — one of the most honest companies, with the best prices, delivery, and respect for the customer. Truly trustworthy, and I highly recommend them.", quoteAr: "بقالي اربع سنين بتعامل مع تليجراف من اصدق الشركات و أحسنهم سعر و تسليم و احترام للعميل. فعلا ثقه و ارشحهم جدا." },
    { slug: "hera-charisma", name: "Hera Charisma", logoFile: "hera-charisma.webp", quoteEn: "Hera Charisma is honored to work with Telegraph for delivering our customers' shipments. The experience was more than excellent — punctual deliveries and a customer service team that resolves any issue quickly.", quoteAr: "تتشرف براند هيرا كاريزما بالتعامل مع تليجراف للشحن. التجربة كانت أكثر من ممتازة، والالتزام بمواعيد التسليم وسرعة حل أي مشكلة تواجه العميل ممتاز." },
    { slug: "avens", name: "Avens", logoFile: "avens-logo.webp", quoteEn: "A respectable company, committed to deadlines whether for customer delivery or cash collection — and all the staff are professional, knowledgeable, and cooperative. From success to success, God willing.", quoteAr: "شركة محترمة ومتلتزمين في مواعيدكم سواء في التسليم للعملاء او تحصيل الفلوس، وكل الاستاف ناس محترمة ومتعاونين. من نجاح لنجاح باذن الله." },
    { slug: "german-mix", name: "German Mix", logoFile: "german-mix.webp", quoteEn: "Thank you for your constant dedication to collaboration and quick follow-up on any matter. Your outstanding service makes shipping easier and working with you always a pleasure.", quoteAr: "شكرًا لحرصكم الدائم على التعاون والمتابعة السريعة لأي أمر، وخدمتكم المميزة اللي بتسهل علينا الشحن وتخلي التعامل معاكم دايمًا مريح." },
    { slug: "qz-store", name: "QZ Store", logoFile: "qz-store.webp", quoteEn: "All thanks to Telegraph for the professionalism and fast delivery — a partnership we're proud of.", quoteAr: "كل الشكر لشركة تليغراف على الاحترافية وسرعة التوصيل.. شراكة نفتخر بيها 👏🚚❤️❤️" },
    { slug: "bloom-store", name: "Bloom Store", logoFile: "Bloom-Store.webp", quoteEn: "It has been a pleasure working with your team. We truly appreciate your dedication and professionalism, and we wish your company continued growth, success, and excellence in every step forward.", quoteAr: "لقد كان من دواعي سرورنا العمل مع فريقكم. نقدر التزامكم واحترافيتكم، ونتمنى لشركتكم استمرار النمو والنجاح والتميز في كل خطوة قادمة." },
    { slug: "stockista-store", name: "Stockista Store", logoFile: "Stockista-Store.webp", quoteEn: "A respectable company that lives up to the trust placed in it, and God willing, always for the better.", quoteAr: "شركة محترمة وقد الثقة وان شاء الله للاحسن دايما." },
    { slug: "cs", name: "CS", logoFile: "cs.webp", quoteEn: "The best thing about you is your commitment to transfers, and your customer service team is respectful and very cooperative.", quoteAr: "احسن حاجة فيكم التزامكم بالتحويلات و خدمة العملاء محترمين و متعاونين جدا." },
    { slug: "selselet-el-qema", name: "Selselet El Qema", logoFile: "selselet-el-qema-top.webp", quoteEn: "Thank you, partners in success 🤗", quoteAr: "شكرالك شركاء النجاح🤗" },
  ];

  for (const [i, t] of testimonials.entries()) {
    const logoPath = path.join(CLIENT_LOGOS_DIR, t.logoFile);
    const logo = fs.existsSync(logoPath) ? await uploadImage(logoPath) : undefined;
    await client.createOrReplace({
      _id: `testimonial-${t.slug}`,
      _type: "testimonial",
      name: t.name,
      logo,
      rating: 5,
      quote: { en: t.quoteEn, ar: t.quoteAr },
      order: i + 1,
    });
  }
  console.log(`✓ ${testimonials.length} testimonials`);
}

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    throw new Error("SANITY_WRITE_TOKEN is not set");
  }
  await seedHomePage();
  await seedAboutPage();
  await seedServices();
  await seedPricingTiers();
  await seedFaqs();
  await seedBranches();
  await seedTeamMembers();
  await seedTestimonials();
  console.log("\n✅ Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
