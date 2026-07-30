import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function key() {
  return randomBytes(6).toString("hex");
}

function loc(en, ar) {
  return { _type: "localeString", en, ar };
}
function locText(en, ar) {
  return { _type: "localeText", en, ar };
}

function block(text, style = "normal", listItem) {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    ...(listItem ? { listItem, level: 1 } : {}),
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

// items: [{ en, ar, style?, listItem? }] -> { en: block[], ar: block[] }
function richContent(items) {
  const en = [];
  const ar = [];
  for (const it of items) {
    en.push(block(it.en, it.style, it.listItem));
    ar.push(block(it.ar, it.style, it.listItem));
  }
  return { _type: "localeBlockContent", en, ar };
}

function lines(text) {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

const TEAM_PHOTO = {
  _type: "image",
  asset: { _type: "reference", _ref: "image-d2f6d9ccd39c5c896f452ba447177dba3f289109-2400x1043-jpg" },
};

function hero(headingEn, headingAr, subEn, subAr) {
  return {
    _key: key(),
    _type: "landingHero",
    heading: loc(headingEn, headingAr),
    ...(subEn || subAr ? { subheading: locText(subEn, subAr) } : {}),
  };
}

function widget(widgetType, opts = {}) {
  return {
    _key: key(),
    _type: "blockWidget",
    widgetType,
    ...(opts.headingEn ? { heading: loc(opts.headingEn, opts.headingAr) } : {}),
    ...(opts.subEn ? { subheading: locText(opts.subEn, opts.subAr) } : {}),
  };
}

function formEmbed(formId, opts = {}) {
  return {
    _key: key(),
    _type: "landingFormEmbed",
    formId,
    ...(opts.headingEn ? { heading: loc(opts.headingEn, opts.headingAr) } : {}),
    ...(opts.subEn ? { subheading: locText(opts.subEn, opts.subAr) } : {}),
  };
}

function featureGrid(displayStyle, items, opts = {}) {
  return {
    _key: key(),
    _type: "landingFeatureGrid",
    displayStyle,
    ...(opts.headingEn ? { heading: loc(opts.headingEn, opts.headingAr) } : {}),
    items: items.map((it) => ({
      _key: key(),
      _type: "featureGridItem",
      title: loc(it.titleEn, it.titleAr),
      ...(it.value ? { value: it.value } : {}),
      ...(it.descEn ? { description: locText(it.descEn, it.descAr) } : {}),
    })),
  };
}

function imageText(image, opts = {}) {
  return {
    _key: key(),
    _type: "landingImageText",
    image,
    ...(opts.headingEn ? { heading: loc(opts.headingEn, opts.headingAr) } : {}),
  };
}

function richText(items) {
  return { _key: key(), _type: "landingRichText", content: richContent(items) };
}

// ---------------------------------------------------------------------------
// sitePage-about
// ---------------------------------------------------------------------------

const storyHeading = { en: "CEO words", ar: "كلمة المدير التنفيذي" };
const story1 = {
  en: "At Telegraph, we don’t just see a shipment as a package moving from point A to point B. We see it as a promise between a business and its customers, and a trust placed securely in our hands.\nThat is why we built Telegraph on a simple conviction: excellence in the logistics sector isn't achieved through empty promises, but through the quality of systems, the efficiency of our people, and an unwavering commitment that doesn't falter with scale or rapid growth.\nWe continuously invest in technology and optimize our operations, believing that every detail—no matter how small—makes a profound difference in your end-customer's experience. Sustainable success isn't built on temporary milestones, but on consistent standards and a work culture that makes quality a daily habit, not an exception.\nOur ambition is clear: for Telegraph to be the benchmark of performance in the shipping and logistics industry. The trust you place in us as a business partner is a responsibility we must earn every single day. This trust has materialized into serving over 500 business partners and successfully delivering more than 5 million shipments. We will continue our journey to support your business expansion and exceed your expectations with logistics services that never compromise on quality.",
  ar: "في تليجراف، لا ننظر إلى الشحنة على أنها مجرد طرد ينتقل من نقطة إلى أخرى، بل نراها وعدًا بين شركة وعملائها، وثقةً أودعت بين أيدينا.\nلهذا، بنينا تليجراف على قناعة بسيطة؛ أن التميز في قطاع اللوجستيات لا يتحقق بكثرة الوعود، وإنما بجودة الأنظمة، وكفاءة الأشخاص، والالتزام الذي لا يتغير مع حجم العمل أو سرعة النمو.\nنستثمر في التقنية، ونطور عملياتنا باستمرار، ونؤمن بأن كل تفصيلة، مهما بدت صغيرة، تصنع فارقًا في تجربة عميلك النهائي. فالاستدامة لا تُبنى على الإنجازات المؤقتة، بل على معايير ثابتة وثقافة عمل تجعل الجودة عادة يومية وليست استثناءً.\nطموحنا واضح؛ أن تكون تليجراف معيارًا يُقاس به الأداء في قطاع الشحن والخدمات اللوجستية، وأن تكون الثقة التي تمنحنا إياها كشريك أعمال مسؤولية نستحقها كل يوم؛ وهي الثقة التي تُوّجت على أرض الواقع بخدمة أكثر من 500 شريك أعمال، وإنجاز توصيل ما يزيد عن 5 ملايين شحنة بنجاح، لنواصل مسيرتنا في دعم نمو تجارتك وتلبية تطلعاتك بخدمات لوجستية لا تقبل المساومة على الجودة.",
};
const story2 = {
  en: "About Us\nFounded in Alexandria in 2019, Telegraph was established to be the strategic logistics partner for the B2B sector and e-commerce enterprises. We do more than just transport packages; we manage an integrated ecosystem designed to support your supply chain with complete agility and absolute transparency.\nWe provide precise operational solutions. As the premier shipping and fulfillment provider for cosmetics, nutritional supplements, apparel, and all small parcels, we leverage our advanced digital infrastructure and real-time tracking systems to guarantee lower return rates and higher delivery efficiency for your store.\nTo support the sustainable expansion of your business, we offer comprehensive services:\nE-commerce Fulfillment & Operations\nIntegrated solutions for picking, packing, and processing digital store orders, backed by simplified developer guides for seamless API Integrations with your store's backend.\nDomestic Shipping\nFast, reliable, and comprehensive geographical coverage across the entire country.\nInternational Air Freight\nA rapid logistical bridge connecting your business to global markets.\nAt Telegraph, we employ cutting-edge technologies and professional talent to carry the burden of logistics operations, freeing you to focus entirely on scaling your commerce.",
  ar: "من نحن\n\nتأسست \"تليجراف\" عام 2019 في الإسكندرية، لتكون الشريك اللوجستي الاستراتيجي لقطاع الأعمال والمتاجر الإلكترونية. نحن لا ننقل الطرود فحسب، بل ندير منظومة متكاملة لدعم سلاسل إمدادك بمرونة وشفافية تامة.\nنقدم لك حلولاً تشغيلية دقيقة ، و بصفتنا أفضل شركة شحن لمستحضرات التجميل، والمكملات الغذائية، والأزياء وجميع الطرود الصغيرة . بفضل بنيتنا الرقمية المتطورة وأنظمة التتبع اللحظي، نضمن لمتجرك تقليل نسب المرتجعات ورفع كفاءة التسليم.\nلدعم التوسع المستدام لأعمالك، نقدم خدمات شاملة:\nإدارة عمليات التجارة الإلكترونية والتخزين:\n حلول متكاملة لتجهيز وتغليف طلبات المتاجر الرقمية، مدعومة بأدلة سهلة للربط البرمجي السلس (API Integration) مع أنظمة متجرك.\nالشحن المحلي:\n تغطية سريعة وموثوقة لكافة أنحاء الجمهورية.\nالشحن الدولي الجوي للشركات:\n جسر سريع يربط أعمالك بالأسواق العالمية.\nفي \"تليجراف\"، نوظف أحدث التقنيات والكوادر المحترفة لنحمل عنك أعباء العمليات اللوجستية، لتتفرغ أنت لنمو تجارتك.",
};

const aboutStoryLinesEn = [...lines(story1.en), ...lines(story2.en)];
const aboutStoryLinesAr = [...lines(story1.ar), ...lines(story2.ar)];

const aboutPage = {
  _id: "sitePage-about",
  _type: "sitePage",
  pageKey: "sitePage-about",
  sections: [
    hero(
      "About Telegraph",
      "عن تلغراف",
      "Egypt's smart logistics platform, built on trust, technology, and a promise kept with every shipment.",
      "منصة الشحن الذكية في مصر، مبنية على الثقة والتقنية، ووعد نفي به مع كل شحنة."
    ),
    richText([
      { en: storyHeading.en, ar: storyHeading.ar, style: "h2" },
      ...aboutStoryLinesEn.map((en, i) => ({ en, ar: aboutStoryLinesAr[i] ?? "" })),
    ]),
    featureGrid(
      "grid",
      [
        { titleEn: "Speed Without Compromise", titleAr: "السرعة دون مساومة", descEn: "We move fast — but never at the expense of accuracy or care.", descAr: "نتحرك بسرعة — لكن أبداً على حساب الدقة أو العناية." },
        { titleEn: "Radical Transparency", titleAr: "شفافية جذرية", descEn: "No hidden fees, no black boxes. Our merchants see exactly what we see.", descAr: "لا رسوم خفية، لا صناديق سوداء. تجارنا يرون بالضبط ما نراه." },
        { titleEn: "Local Ownership", titleAr: "ملكية محلية", descEn: "We're Egyptian. We hire Egyptian. We solve Egyptian problems.", descAr: "نحن مصريون. نوظف مصريين. نحل مشاكل مصرية." },
      ],
      { headingEn: "What We Stand For", headingAr: "ما نقف من أجله" }
    ),
    imageText(TEAM_PHOTO, { headingEn: "The People Behind the Platform", headingAr: "الأشخاص وراء المنصة" }),
    widget("testimonials", {
      headingEn: "Our Clients Testimonials",
      headingAr: "شهادات عملائنا",
      subEn: "Our service starts from the very first order and continues until your shipment arrives safely and on time. This is what we always hear from our clients.",
      subAr: "خدمتنا تبدأ من أول طلب وتستمر حتى تصل شحنتك بأمان وفي الوقت المحدد. هذا ما نسمعه دائماً من عملائنا.",
    }),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-services
// ---------------------------------------------------------------------------

const servicesPage = {
  _id: "sitePage-services",
  _type: "sitePage",
  pageKey: "sitePage-services",
  sections: [
    hero(
      "One Platform. Every Shipping Need.",
      "منصة واحدة. كل احتياجات الشحن.",
      "From pickup to proof-of-delivery, Telegraph handles the complexity so you don't have to.",
      "من الاستلام إلى إثبات التسليم، تلغراف يتولى التعقيد."
    ),
    widget("serviceGrid"),
    featureGrid(
      "numbered",
      [
        { titleEn: "Create Shipment", titleAr: "إنشاء الشحنة", descEn: "Enter pickup and delivery details.", descAr: "أدخل تفاصيل الاستلام والتسليم." },
        { titleEn: "We Pick Up", titleAr: "نستلم", descEn: "Our courier arrives at your location.", descAr: "يصل مندوبنا في الوقت المحدد." },
        { titleEn: "Smart Delivery", titleAr: "توصيل ذكي", descEn: "AI routing gets your package to its destination.", descAr: "التوجيه الذكي يوصل طردك عبر المسار الأمثل." },
        { titleEn: "Get Paid", titleAr: "احصل على المدفوعات", descEn: "Payment is collected and settled within 48 hours.", descAr: "يتم تحصيل المدفوعات وإيداعها خلال 48 ساعة." },
      ],
      { headingEn: "How Telegraph Works", headingAr: "كيف يعمل تلغراف" }
    ),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-careers
// ---------------------------------------------------------------------------

const careersPage = {
  _id: "sitePage-careers",
  _type: "sitePage",
  pageKey: "sitePage-careers",
  sections: [
    hero(
      "Join the Telegraph Team",
      "انضم لفريق تلغراف",
      "We're building the future of Egyptian logistics — and we want people to build it with us.",
      "نبني مستقبل اللوجستيات المصرية — وعايزين ناس تبنيه معانا."
    ),
    featureGrid("grid", [
      { titleEn: "A Tech Company First", titleAr: "شركة تقنية أولاً", descEn: "We build real logistics software — not just another traditional shipping company.", descAr: "نبني برمجيات لوجستية حقيقية، مش مجرد شركة شحن تقليدية." },
      { titleEn: "A Fully Egyptian Team", titleAr: "فريق مصري بالكامل", descEn: "We're Egyptian, we hire Egyptian, and we solve Egyptian problems with real understanding of the local market.", descAr: "نحن مصريون، نوظف مصريين، ونحل مشاكل مصرية بفهم حقيقي للسوق المحلي." },
      { titleEn: "Fast Growth", titleAr: "نمو سريع", descEn: "From a single branch to a national network — join us in a real growth phase.", descAr: "من فرع واحد إلى شبكة وطنية — انضم لنا في مرحلة نمو حقيقية." },
    ]),
    imageText(TEAM_PHOTO, { headingEn: "Meet the Team", headingAr: "تعرف على الفريق" }),
    formEmbed("yPpGVW", {
      headingEn: "Apply Now",
      headingAr: "قدّم الآن",
      subEn: "Fill out the form below and our team will be in touch soon.",
      subAr: "املأ النموذج وسيتواصل معك فريقنا قريبًا.",
    }),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-getStarted
// ---------------------------------------------------------------------------

const getStartedPage = {
  _id: "sitePage-getStarted",
  _type: "sitePage",
  pageKey: "sitePage-getStarted",
  sections: [
    hero(
      "Create Your Free Account",
      "أنشئ حسابك المجاني",
      "Fill in your details and our team will reach out to get your account set up shortly.",
      "املأ بياناتك وسيتواصل معك فريقنا لإعداد حسابك خلال وقت قصير."
    ),
    formEmbed("EkrgyL"),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-contact
// ---------------------------------------------------------------------------

const contactPage = {
  _id: "sitePage-contact",
  _type: "sitePage",
  pageKey: "sitePage-contact",
  sections: [
    hero("Get in Touch", "تواصل معنا", "Our team is ready to help you ship smarter.", "فريقنا جاهز لمساعدتك في الشحن بذكاء."),
    formEmbed("9qgab4"),
    widget("contactInfo"),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-branches
// ---------------------------------------------------------------------------

const branchesPage = {
  _id: "sitePage-branches",
  _type: "sitePage",
  pageKey: "sitePage-branches",
  sections: [
    hero("Our Branches", "فروعنا", "Find a Telegraph branch near you.", "اعثر على فرع تلغراف بالقرب منك."),
    widget("branchList"),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-coverage (no previous singleton — copy lifted from the old
// hardcoded JSX in Coverage.tsx)
// ---------------------------------------------------------------------------

const coveragePage = {
  _id: "sitePage-coverage",
  _type: "sitePage",
  pageKey: "sitePage-coverage",
  sections: [
    hero(
      "Nationwide Coverage, Local Precision",
      "تغطية على مستوى الجمهورية، دقة محلية",
      "From dense urban centers to remote governorate towns — Telegraph delivers across every region of Egypt.",
      "من المراكز الحضرية الكثيفة إلى البلدات النائية — تلغراف يوصل إلى كل منطقة في مصر."
    ),
    widget("deliveryZonesTable", {
      headingEn: "Average Delivery Time by Zone",
      headingAr: "متوسط مدة التوصيل حسب المنطقة",
      subEn: "Average delivery duration across our geographic zones.",
      subAr: "متوسط مدة توصيل الزونات والمناطق الجغرافية.",
    }),
    widget("officeLocations", { headingEn: "Our Office Locations", headingAr: "مواقع فروعنا" }),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-faq (no previous singleton — copy lifted from the old hardcoded
// JSX in FAQ.tsx)
// ---------------------------------------------------------------------------

const faqPage = {
  _id: "sitePage-faq",
  _type: "sitePage",
  pageKey: "sitePage-faq",
  sections: [
    hero(
      "Frequently Asked Questions",
      "الأسئلة الشائعة",
      "Everything you need to know about shipping with Telegraph.",
      "كل ما تحتاج معرفته عن الشحن مع تلغراف."
    ),
    widget("faqList"),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-privacy
// ---------------------------------------------------------------------------

const privacySections = [
  { titleEn: "Information We Collect", titleAr: "المعلومات التي نجمعها", contentEn: "We collect personal information such as name, email address, phone number, and shipping address when you use our services.", contentAr: "نجمع معلومات شخصية مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف وعنوان الشحن عند استخدامك لخدماتنا." },
  { titleEn: "How We Use Information", titleAr: "كيف نستخدم المعلومات", contentEn: "We use your information to provide shipping and delivery services, improve your experience, and communicate with you about your orders.", contentAr: "نستخدم معلوماتك لتقديم خدمات الشحن والتوصيل، وتحسين تجربتك، والتواصل معك بشأن طلباتك." },
  { titleEn: "Data Security", titleAr: "أمان البيانات", contentEn: "We use industry-standard security measures to protect your information from unauthorized access, disclosure, or destruction.", contentAr: "نستخدم تدابير أمان صناعية لحماية معلوماتك من الوصول غير المصرح به أو الكشف أو التدمير." },
  { titleEn: "Your Rights", titleAr: "حقوقك", contentEn: "You have the right to access, correct, or delete your personal information. You can contact us to exercise these rights.", contentAr: "لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها. يمكنك الاتصال بنا لممارسة هذه الحقوق." },
];

const privacyPage = {
  _id: "sitePage-privacy",
  _type: "sitePage",
  pageKey: "sitePage-privacy",
  sections: [
    hero("Privacy Policy", "سياسة الخصوصية", "Last updated: January 2025", "آخر تحديث: يناير 2025"),
    richText(
      privacySections.flatMap((s) => [
        { en: s.titleEn, ar: s.titleAr, style: "h2" },
        { en: s.contentEn, ar: s.contentAr },
      ])
    ),
  ],
};

// ---------------------------------------------------------------------------
// sitePage-terms
// ---------------------------------------------------------------------------

const termsSections = [
  {
    titleEn: "Pickup Policy",
    titleAr: "سياسة البيك أب",
    items: [
      { en: "Pickup requests are created through our website, the app, or by contacting the company — either the day before or the same day before 12 PM for same-day pickup — or shipments can be delivered directly to our branch.", ar: "يتم طلب مندوب استلام الاوردرات (البيك اب) من خلال انشاء طلب التقاط على الويب سايت الخاص بالشركة أو من خلال الابلكيشن أو من خلالها بيوم قبلها أو في نفس اليوم قبل الساعة 12 ظهرا – لاستلامها في نفس اليوم- أو تسليم الشحنات بمقر الشركة." },
      { en: "Pickup service is free starting from 5 orders. If there are fewer than 5, delivery is arranged via one of the company's branches or through a courier for a 50 EGP fee.", ar: "خدمة البيك اب مجانية بداية من 5 اوردرات وفي حالة وجود بيك اب اقل من ذلك يتم تسليمه باحدي فروع الشركة او من خلال المندوب بتكلفة 50ج." },
      { en: "We do not deal directly with couriers regarding pickup requests or anything related to shipments — the company is not liable for any issue that may occur as a result of doing so.", ar: "لا يتم التعامل مباشرة مع المناديب لطلب بيك اب او اي شيء يتعلق بإرسال شحنات وفي حالة حدوث ذلك فالشركة غير مسئولة عن اي اخلال قد يحدث." },
      { en: "The delivery timeframe is calculated starting from the day after the shipment is received.", ar: "يتم احتساب المدة الزمنية بداية من اليوم التالي لاستلام الشحنات." },
    ],
  },
  {
    titleEn: "Delivery Policy",
    titleAr: "سياسة التوصيل",
    items: [
      { en: "Shipments are received wrapped in a Flyer with the shipping invoice attached. If a shipment is delivered without company packaging or data, the company is not liable for a lost shipment.", ar: "يتم استلام الشحنات مغلفة بالفلاير ومرفق بها بوليصة الشحن، وفي حالة تسليمها بدون تغليف الشركة او بدون أي بيانات فالشركة تكون غير مسؤولة عن فقد الشحنة." },
      { en: "Shipment creation and tracking is done online through our website or app, or through customer service.", ar: "يتم انشاء ومتابعة الشحنات اونلاين من خلال الويب سايت أو الابلكيشن الخاص بالشركة أو من خلال خدمة العملاء." },
      { en: "Delivery is attempted three times, on three different working days, according to the courier's route.", ar: "يتم محاولة تسليم الشحنة ثلاث مرات في ثلاث ايام عمل مختلفة وفقا لخط سير المندوب." },
      { en: "If the sender requests a delayed pickup, the maximum delay period is 6 days. Beyond that, the shipment is returned to the sender.", ar: "في حالة طلب المرسل الية تأجيل استلام الشحنة تكون أقصى فترة ممكنة 6 ايام وفي حالة التأجيل لمدة أكثر من ذلك يتم ارجاع الشحنة الي الراسل." },
      { en: "Free shipment opening and inspection is available to the recipient, with a maximum courier wait time of 10 minutes — beyond that, the shipment is counted as returned.", ar: "متاح خدمة فتح ومعاينة الشحنة مجانا للمرسل اليه علي ان تكون اكبر فترة متاحة لفتح ومعاينة الشحنة 10 دقائق وفي حالة انتظار المندوب اكثر من ذلك يتم احتساب الشحنة مرتجع." },
    ],
  },
  {
    titleEn: "Collection & Payment",
    titleAr: "التحصيل",
    items: [
      { en: "The total value of shipments delivered more than 48 hours prior is collected and settled to the client on the agreed days, per the agreed collection method.", ar: "يتم تحصيل إجمالي قيمة الشحنات التي مرّ على تسليمها أكثر من 48 ساعة، وذلك في الأيام المحددة لكل عميل، وفقًا لطريقة التحصيل المتفق عليها." },
      { en: "Weekly settlement is made via bank transfer (20 EGP fee on the total transfer amount), or through e-wallets (Vodafone Cash, Etisalat, Orange, WE) also for a 20 EGP transfer fee.", ar: "يتم تحصيل التسوية الخاصة بالعملاء أسبوعياً من خلال: تحويل بنكي برسوم 20 ج علي اجمالي التحويل، أو من خلال المحافظ الالكترونية (فودافون – اتصالات – أورانج – وي) برسوم 20ج للتحويل." },
      { en: "The maximum value for a single shipment is 3,000 EGP; if exceeded, a 1% collection fee applies (minimum 10 EGP).", ar: "الحد الاقصي لثمن الشحنة الواحدة لا يتجاوز 3000 جنيها مصريا وفي حالة تجاوز المبلغ يتم احتساب 1% علي التحصيل بحد ادني 10 ج." },
      { en: "The maximum price for a single shipment is 10,000 EGP.", ar: "الحد الأقصي لسعر الشحنة الواحدة لا يتجاوز 10,000 جنيها مصريا." },
      { en: "Listed prices apply to shipments weighing up to 3kg. An additional 5 EGP is added per extra kg, up to a maximum of 5kg additional.", ar: "الاسعار الموضحة سلفا حتى وزن 3 كجم ويتم اضافة مبلغ 5 جنيهات على كل كيلو اضافي بحد أقصي 5 كجم." },
      { en: "The maximum shipment size is 40×40×20 cm. Shipments exceeding these dimensions are treated as a new shipment, with additional charges applied.", ar: "أكبر حجم للشحنة الواحدة (40*40*20) و في حالة تجاوز حجم الشحنة الأبعاد الخاصة بالشركة يتم اضافة شحنة جديدة ويتم اضافة المصاريف المستحقة عليها." },
      { en: "An exchange service (package-for-package) is available for a 15 EGP fee, added to the shipping price.", ar: "متاح خدمة الاستبدال (طرد مقابل طرد) مقابل مبلغ 15ج تضاف علي سعر الشحن." },
      { en: "Deliveries do not take place during official holidays or bank holidays.", ar: "لا تتم التوريدات أثناء الاجازات الرسمية والاجازات البنكية." },
    ],
  },
  {
    titleEn: "General Terms & Notes",
    titleAr: "شروط وملاحظات عامة للخدمة",
    items: [
      { en: "The sender is responsible for packaging their shipments in a way that protects them from cracks, scratches, leakage, or content separation during transport and delivery.", ar: "الراسل مسئول عن تغليف شحناته بالشكل الذي يحافظ عليها من الشروخ او الخدوش او الانبعاج او انفصال احد محتوياتها عن باقي الشحنة أثناء عملية النقل و التوصيل." },
      { en: "Fragile, breakable products are not shipped. If the sender insists, the company is absolved of liability should damage occur in transit.", ar: "لايتم شحن المنتجات القابلة للكسر وفي حالة اصرار الراسل فالشركة تخلي مسؤليتها في حالة حدوث تلف في الشحنة." },
      { en: "The company does not deliver food items, chemicals, liquids, or any items that violate Egyptian law. Should this occur, full liability rests with the sender.", ar: "لا تقوم الشركة بتوصيل (المأكولات - الكيماويات - المواد السائلة - اي مواد مخالفة للقانون المصري) وفي حالة حدوث ذلك تكون المسئولية كاملة على الراسل." },
      { en: "The company is not liable for shipment contents; its responsibility ends once the shipment is delivered to the recipient.", ar: "الشركة غير مسئولة عن محتويات الشحنة وتنتهي مسئوليتها بمجرد تسليم الشحنة للمرسل اليه." },
      { en: "Storage is available for part of a client's products within company premises, and shipments are dispatched as soon as they are registered in the system.", ar: "متاح تخزين جزء من منتجات العميل داخل مقر الشركة وارسالها كشحنات بمجرد تسجيلها علي السيستم." },
      { en: "The company does not operate during the weekly holiday (Friday) and some official holidays.", ar: "الشركة لا تعمل اثناء العطلة الاسبوعية يوم الجمعة وبعض الاجازات الرسمية." },
      { en: "Compensation for a lost shipment is payable within 14 days of the loss date, following the necessary investigations, in accordance with the company's approved terms and conditions.", ar: "يتم استحقاق التعويض في حال فقد الشحنة خلال 14 يومًا من تاريخ الفقد، وذلك بعد الانتهاء من التحقيقات اللازمة، ووفقًا للشروط والأحكام المعتمدة من الشركة." },
    ],
  },
];

const packagingPrices = [
  { titleEn: "Flyer S (35×25 cm)", titleAr: "فلاير S (35*25)", value: "2.5 EGP" },
  { titleEn: "Flyer M (35×45 cm)", titleAr: "فلاير M (35*45)", value: "3.5 EGP" },
  { titleEn: "Flyer L (50×40 cm)", titleAr: "فلاير L (50*40)", value: "5 EGP" },
  { titleEn: "Flyer XL (60×50 cm)", titleAr: "فلاير XL (60*50)", value: "6 EGP" },
  { titleEn: "Box S (20×10×8 cm)", titleAr: "بوكس S (20*10*8)", value: "5 EGP" },
  { titleEn: "Box L (20×13×18 cm)", titleAr: "بوكس L (20*13*18)", value: "7 EGP" },
];

const termsPage = {
  _id: "sitePage-terms",
  _type: "sitePage",
  pageKey: "sitePage-terms",
  sections: [
    hero(
      "Telegraph Shipping & Delivery Policies",
      "سياسات شركة تلغراف لخدمات الشحن والتوصيل",
      "Last updated: 2026",
      "آخر تحديث: 2026"
    ),
    richText(
      termsSections.flatMap((s) => [
        { en: s.titleEn, ar: s.titleAr, style: "h2" },
        ...s.items.map((it) => ({ en: it.en, ar: it.ar, listItem: "bullet" })),
      ])
    ),
    featureGrid(
      "pricing",
      packagingPrices.map((p) => ({ titleEn: p.titleEn, titleAr: p.titleAr, value: p.value })),
      { headingEn: "Packaging Material Pricing", headingAr: "أسعار مواد التغليف" }
    ),
  ],
};

// ---------------------------------------------------------------------------

const pages = [
  aboutPage,
  servicesPage,
  careersPage,
  getStartedPage,
  contactPage,
  branchesPage,
  coveragePage,
  faqPage,
  privacyPage,
  termsPage,
];

async function run() {
  for (const doc of pages) {
    await client.createOrReplace(doc);
    console.log(`✓ ${doc._id} (${doc.sections.length} sections)`);
  }
  console.log("done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
