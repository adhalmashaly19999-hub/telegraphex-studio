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
function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}
// items: [{ en, ar, style?: 'normal'|'h2'|'h3'|'blockquote' }]
function richContent(items) {
  const en = [];
  const ar = [];
  for (const it of items) {
    en.push(block(it.en, it.style));
    ar.push(block(it.ar, it.style));
  }
  return { _type: "localeBlockContent", en, ar };
}
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
    ...(opts.imagePosition ? { imagePosition: opts.imagePosition } : {}),
  };
}
function richText(items) {
  return { _key: key(), _type: "landingRichText", content: richContent(items) };
}
function cta(headingEn, headingAr, buttonLabelEn, buttonLabelAr, buttonLink) {
  return {
    _key: key(),
    _type: "landingCta",
    heading: loc(headingEn, headingAr),
    buttonLabel: loc(buttonLabelEn, buttonLabelAr),
    buttonLink,
  };
}

const TEAM_PHOTO = {
  _type: "image",
  asset: { _type: "reference", _ref: "image-d2f6d9ccd39c5c896f452ba447177dba3f289109-2400x1043-jpg" },
};

// ---------------------------------------------------------------------------
// sitePage-about
// ---------------------------------------------------------------------------

const aboutPage = {
  _id: "sitePage-about",
  _type: "sitePage",
  pageKey: "sitePage-about",
  sections: [
    hero(
      "A Promise Kept, With Every Shipment",
      "وفاء بالوعد مع كل شحنة",
      "Striving to become the best shipping company in Egypt.",
      "نسعي لنكون افضل شركة شحن في مصر"
    ),
    richText([
      { en: "Our CEO", ar: "كلمة المدير التنفيذي", style: "h2" },
      {
        en: "At Telegraph, we don't just see a shipment as a package moving from point A to point B. We see it as a promise between a business and its customers, and a trust placed securely in our hands.",
        ar: "في تليجراف، لا ننظر إلى الشحنة على أنها مجرد طرد ينتقل من نقطة إلى أخرى، بل نراها وعدًا بين شركة وعملائها، وثقةً أودعت بين أيدينا.",
      },
      {
        en: "That is why we built Telegraph on a simple conviction: excellence in the logistics sector isn't achieved through empty promises, but through the quality of systems, the efficiency of our people, and an unwavering commitment that doesn't falter with scale or rapid growth.",
        ar: "لهذا، بنينا تليجراف على قناعة بسيطة؛ أن التميز في قطاع اللوجستيات لا يتحقق بكثرة الوعود، وإنما بجودة الأنظمة، وكفاءة الأشخاص، والالتزام الذي لا يتغير مع حجم العمل أو سرعة النمو.",
      },
      {
        en: "We continuously invest in technology and optimize our operations, believing that every detail—no matter how small—makes a profound difference in your end-customer's experience. Sustainable success isn't built on temporary milestones, but on consistent standards and a work culture that makes quality a daily habit, not an exception.",
        ar: "نستثمر في التقنية، ونطور عملياتنا باستمرار، ونؤمن بأن كل تفصيلة، مهما بدت صغيرة، تصنع فارقًا في تجربة عميلك النهائي. فالاستدامة لا تُبنى على الإنجازات المؤقتة، بل على معايير ثابتة وثقافة عمل تجعل الجودة عادة يومية وليست استثناءً.",
      },
      {
        en: "Our ambition is clear: for Telegraph to be the benchmark of performance in the shipping and logistics industry. The trust you place in us as a business partner is a responsibility we must earn every single day. This trust has materialized into serving over 500 business partners and successfully delivering more than 5 million shipments. We will continue our journey to support your business expansion and exceed your expectations with logistics services that never compromise on quality.",
        ar: "طموحنا واضح؛ أن تكون تليجراف معيارًا يُقاس به الأداء في قطاع الشحن والخدمات اللوجستية، وأن تكون الثقة التي تمنحنا إياها كشريك أعمال مسؤولية نستحقها كل يوم؛ وهي الثقة التي تُوّجت على أرض الواقع بخدمة أكثر من 500 شريك أعمال، وإنجاز توصيل ما يزيد عن 5 مليون شحنة بنجاح، لنواصل مسيرتنا في دعم نمو تجارتك وتلبية تطلعاتك بخدمات لوجستية لا تقبل المساومة على الجودة.",
      },
      { en: "Join Over 500 Business Partners Today!", ar: "انضم إلى أكثر من 500 شريك أعمال الآن!", style: "blockquote" },
    ]),
    richText([
      { en: "About Us", ar: "من نحن", style: "h2" },
      {
        en: "Founded in Alexandria in 2019, Telegraph was established to be the strategic logistics partner for the B2B sector and e-commerce enterprises. We do more than just transport packages; we manage an integrated ecosystem designed to support your supply chain with complete agility and absolute transparency.",
        ar: "تأسست \"تليجراف\" عام 2019 في الإسكندرية، لتكون الشريك اللوجستي الاستراتيجي لقطاع الأعمال والمتاجر الإلكترونية. نحن لا ننقل الطرود فحسب، بل ندير منظومة متكاملة لدعم سلاسل إمدادك بمرونة وشفافية تامة.",
      },
      {
        en: "We provide precise operational solutions. As the premier shipping and fulfillment provider for cosmetics, nutritional supplements, apparel, and all small parcels, we leverage our advanced digital infrastructure and real-time tracking systems to guarantee lower return rates and higher delivery efficiency for your store.",
        ar: "نقدم لك حلولاً تشغيلية دقيقة، وبصفتنا أفضل شركة شحن لمستحضرات التجميل، والمكملات الغذائية، والأزياء وجميع الطرود الصغيرة، بفضل بنيتنا الرقمية المتطورة وأنظمة التتبع اللحظي، نضمن لمتجرك تقليل نسب المرتجعات ورفع كفاءة التسليم.",
      },
      {
        en: "To support the sustainable expansion of your business, we offer comprehensive services:",
        ar: "لدعم التوسع المستدام لأعمالك، نقدم خدمات شاملة:",
      },
      { en: "E-commerce Fulfillment & Operations", ar: "إدارة عمليات التجارة الإلكترونية والتخزين", style: "h3" },
      {
        en: "Integrated solutions for picking, packing, and processing digital store orders, backed by simplified developer guides for seamless API Integrations with your store's backend.",
        ar: "حلول متكاملة لتجهيز وتغليف طلبات المتاجر الرقمية، مدعومة بأدلة سهلة للربط البرمجي السلس (API Integration) مع أنظمة متجرك.",
      },
      { en: "Domestic Shipping", ar: "الشحن المحلي", style: "h3" },
      {
        en: "Fast, reliable, and comprehensive geographical coverage across the entire country.",
        ar: "تغطية سريعة وموثوقة لكافة أنحاء الجمهورية.",
      },
      { en: "International Air Freight", ar: "الشحن الدولي الجوي", style: "h3" },
      {
        en: "A rapid logistical bridge connecting your business to global markets.",
        ar: "جسر سريع يربط أعمالك بالأسواق العالمية.",
      },
      {
        en: "At Telegraph, we employ cutting-edge technologies and professional talent to carry the burden of logistics operations, freeing you to focus entirely on scaling your commerce.",
        ar: "في \"تليجراف\"، نوظف أحدث التقنيات والكوادر المحترفة لنحمل عنك أعباء العمليات اللوجستية، لتتفرغ أنت لنمو تجارتك.",
      },
      { en: "Connect Your Store to Our Systems Now", ar: "اربط متجرك بأنظمتنا الان", style: "blockquote" },
    ]),
    featureGrid(
      "grid",
      [
        {
          titleEn: "Our Mission", titleAr: "مهمتنا",
          descEn: "To develop innovative logistics solutions that elevate the standard of fast and secure delivery services for all parcels.",
          descAr: "تطوير حلول لوجستية مبتكرة ترقى لتقديم خدمات توصيل سريعة وآمنة لجميع الطرود.",
        },
        {
          titleEn: "Our Goals", titleAr: "أهدافنا",
          descEn: "To support and keep pace with the exponential growth of the e-commerce market by providing advanced shipping services driven by the latest technologies and the highest standards of professional conduct for merchants and enterprises.",
          descAr: "الدعم والمواكبة للنمو المتزايد في سوق التجارة الإلكترونية، من خلال تقديم خدمات شحن متطورة تعتمد على أحدث التقنيات وأفضل قواعد السلوك المهني لخدمة المتاجر والشركات.",
        },
        {
          titleEn: "Our Vision", titleAr: "رؤيتنا",
          descEn: "To establish a foundation of transparency and credibility, becoming the strongest success partner for your commercial enterprise through unmatched punctuality, rapid delivery, and guaranteed shipment safety.",
          descAr: "إرساء قواعد الشفافية والمصداقية لنكون شركاء النجاح الأقوى لمؤسستكم التجارية، من خلال دقة المواعيد، سرعة التوصيل، وضمان سلامة الشحنات.",
        },
        {
          titleEn: "Our Values", titleAr: "قيمنا",
          descEn: "Transparency, Cargo Safety, Business Integrity, and Absolute Responsibility towards our clients.",
          descAr: "الشفافية، أمان البضائع، الأمانة في التعامل، والمسؤولية الكاملة تجاه عملائنا.",
        },
      ],
      { headingEn: "Our Strategy", headingAr: "استراتيجيتنا" }
    ),
    imageText(TEAM_PHOTO, { headingEn: "Telegraph Shipping Heroes", headingAr: "أبطال تليجراف (فريق تليجراف)", imagePosition: "above" }),
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
      "Integrated Logistics Solutions... Tailored for Your Business Growth.",
      "حلول لوجستية متكاملة.. مصممة خصيصاً لنمو تجارتك.",
      "At Telegraph, we don't just move packages from one point to another; we provide a complete operational ecosystem that protects your products, ensures customer satisfaction, and accelerates your revenue collection. Explore our suite of services—designed specifically to address the pain points of the e-commerce sector—and choose the optimal solution to scale your business operations.",
      "في \"تليجراف\"، لا نكتفي بنقل الطرود من نقطة لأخرى؛ بل نوفر منظومة تشغيلية كاملة تحمي منتجاتك، وتضمن رضا عملائك، وتسرّع من تحصيل أموالك. استكشف خدماتنا المصممة لتلبية كافة احتياجات قطاع التجارة الإلكترونية، واختر الحل الأنسب لتوسيع نطاق أعمالك."
    ),
    widget("serviceGrid"),
    cta(
      "Ready to Accelerate Your Cash Flow and Elevate Your Customer Experience?",
      "جاهز لتسريع دورة رأس مالك والارتقاء بتجربة عملائك؟",
      "Create Your Free Account Now",
      "أنشئ حسابك المجاني الآن",
      "/get-started"
    ),
  ],
};

// ---------------------------------------------------------------------------
// service detail bodies (patched onto existing `service` documents by slug)
// ---------------------------------------------------------------------------

const serviceBodies = {
  "service-domestic-shipping": [
    {
      en: "Delay is the enemy of your sales. That's why we've engineered a clockwork domestic shipping network designed to deliver your orders at lightning speed, maintaining the lowest return rates in the market.",
      ar: "تأخير التوصيل هو العدو الأول لمبيعاتك. لذلك، صممنا شبكة شحن داخلي تعمل بدقة الساعة لضمان وصول طلباتك بأسرع وقت، وبأقل نسبة مرتجعات في السوق.",
    },
    { en: "The 24-Hour Promise (Pickup & Delivery)", ar: "وعد الـ 24 ساعة (استلام وتوصيل)", style: "h3" },
    {
      en: "Confirm your order before 12:00 PM (Cairo Time), and we'll pick up the shipment from your doorstep the exact same day, delivering it to your customer the very next day. (Applicable in major cities: Cairo, Alexandria, Giza, Suez, Ismailia, Port Said, Tanta, and Mansoura).",
      ar: "قم بتأكيد طلبك قبل الساعة 12:00 ظهراً (بتوقيت القاهرة)، وسنقوم باستلام الشحنة من باب مقرك في نفس اليوم، لتكون بين يدي عميلك في اليوم التالي مباشرة. (في المدن الرئيسية: القاهرة، الإسكندرية، الجيزة، السويس، الإسماعيلية، بورسعيد، طنطا، والمنصورة).",
    },
    { en: "Limitless Geographical Reach", ar: "تغطية جغرافية بلا قيود", style: "h3" },
    {
      en: "We deliver your products across 23 governorates and remote areas with competitive, transparent pricing—absolutely no hidden fees.",
      ar: "نصل بمنتجاتك إلى 23 محافظة بتسعير مناسب وبدون رسوم خفية.",
    },
    { en: "Door-to-Door Exchange", ar: "استبدال \"طرد مقابل طرد\"", style: "h3" },
    {
      en: "Resolve order errors or exchange requests instantly. Our courier delivers the replacement and retrieves the returned item in the exact same visit, guaranteeing a flawless customer experience.",
      ar: "عالج أخطاء الطلبات أو طلبات الاستبدال فوراً. المندوب يسلم المنتج الجديد ويستلم المرتجع في نفس اللحظة لضمان تجربة شرائية أفضل لعملائك.",
    },
    { en: "Smart Returns Management", ar: "إدارة المرتجعات", style: "h3" },
    {
      en: "Returns are a part of e-commerce, but we ensure they bounce back to your warehouse at maximum speed to protect your inventory and minimize financial loss.",
      ar: "المرتجعات جزء من التجارة، لكننا نضمن عودتها لمخزنك بسرعة فائقة للحفاظ على مخزونك وتقليل خسائرك.",
    },
    { en: "Secure Warehousing", ar: "التخزين", style: "h3" },
    { en: "Safe, fully-equipped local storage spaces available for our clients.", ar: "مساحات تخزين آمنة لعملائنا داخل مستودعاتنا المجهزة." },
    { en: "Cash on Delivery (COD) Remittances", ar: "تحصيل نقدي (COD)", style: "h3" },
    {
      en: "Cash flow is the lifeline of your business. We provide fast, scheduled COD payouts via Bank Transfers, E-Wallets, or Cash pickup from our branches.",
      ar: "دورة رأس المال هي شريان عملك. نوفر لك تحويلات دورية سريعة لمدفوعات عملائك عبر التحويلات البنكية، المحافظ الإلكترونية، أو استلام نقدي من فروعنا.",
    },
    {
      en: "Don't let your customers wait, and don't keep your cash tied up! Join hundreds of merchants who trust our speed to scale their daily sales.",
      ar: "لا تدع عميلك ينتظر كثيرا، ولا تترك أموالك معلقة! انضم لمئات التجار الذين يثقون في سرعتنا لزيادة مبيعاتهم اليومية.",
      style: "blockquote",
    },
  ],
  "service-international-shipping": [
    {
      en: "Take your ambitions beyond local borders. We empower you with a global network of agents, opening the doors of the world to your business.",
      ar: "أنطلق بطموحك خارج الحدود المحلية، نوفر لك شبكة وكلاء عالمية تفتح لك أبواب العالم.",
    },
    { en: "Express Air Freight", ar: "الشحن الجوي السريع", style: "h3" },
    {
      en: "Whether you are sending urgent commercial samples or personal parcels, we secure the fastest flight routes to your final destination.",
      ar: "سواء كانت عينات تجارية عاجلة أو طروداً شخصية، نضمن لك أسرع مسار طيران للوصول إلى الوجهة النهائية.",
    },
    { en: "Door-to-Door Customs Clearance", ar: "التخليص الجمركي (من الباب للباب)", style: "h3" },
    {
      en: "Let our legal and logistics experts navigate the complexities of customs on your behalf, keeping you safe from delay penalties and held goods.",
      ar: "فريقنا القانوني واللوجستي ينهي كافة تعقيدات التخليص الجمركي نيابة عنك، لتتجنب غرامات التأخير وحجز البضائع.",
    },
    { en: "Shop & Ship Services", ar: "خدمة الشراء والشحن", style: "h3" },
    {
      en: "Shop from major global brands, and we will consolidate your shipments and forward them to you at the lowest possible cost.",
      ar: "تسوق من كبرى العلامات العالمية، وسنقوم بتجميع شحناتك وشحنها إليك بأقل تكلفة ممكنة.",
    },
    { en: "The Speed-Value Equation", ar: "معادلة السعر والسرعة", style: "h3" },
    {
      en: "You are in complete control. Choose between Economy Shipping (for non-urgent commercial volumes) or Express Shipping, with precise pricing based on both actual and volumetric weight to guarantee the best value.",
      ar: "أنت من يتحكم. اختر بين الشحن الاقتصادي (للكميات التجارية غير العاجلة) أو الشحن السريع العاجل، مع تسعير دقيق يعتمد على الوزن الحجمي والفعلي لضمان أفضل قيمة.",
    },
    {
      en: "The world is your next market! Cross borders and start exporting with the lowest costs and fastest transit times. Let our experts chart the perfect route for your shipment.",
      ar: "العالم هو سوقك القادم! تجاوز الحدود المحلية وابدأ التصدير بأقل تكلفة وأسرع وقت ممكن. دع خبرائنا يخططون لك أفضل مسار لشحنتك.",
      style: "blockquote",
    },
  ],
  "service-warehouses-storage": [
    {
      en: "You focus on marketing and sales; let us handle the entire operational heavy lifting.",
      ar: "ركز أنت على التسويق والمبيعات، واترك لنا عمليات التشغيل بالكامل.",
    },
    { en: "Secure & Compliant Warehousing", ar: "تخزين آمن ومطابق للمواصفات", style: "h3" },
    { en: "24/7 monitored storage facilities designed to keep your inventory perfectly safe.", ar: "مستودعات مراقبة على مدار الساعة." },
    { en: "Professional Pick & Pack", ar: "التقاط وتغليف احترافي", style: "h3" },
    {
      en: "The moment an order drops, our team picks it, packs it with premium care, and attaches the Air Waybill (AWB)—reflecting your brand's high-quality standards right at your customer's doorstep.",
      ar: "بمجرد وصول الطلب، يقوم فريقنا بتجهيزه، وتغليفه بعناية فائقة، ولصق بوليصة الشحن، ليعكس جودة علامتك التجارية أمام عملائك.",
    },
    {
      en: "Escape the chaos of cardboard boxes and the exhaustion of packing. Channel your energy into marketing and multiplying your profits. We are here to be your hidden operational arm!",
      ar: "تخلص من فوضى الكراتين وإرهاق التغليف، وركز طاقتك على التسويق ومضاعفة أرباحك. نحن هنا لنكون ذراعك التشغيلي الخفي!",
      style: "blockquote",
    },
  ],
  "service-api-integration": [
    {
      en: "Manual data entry kills business growth. Our smart logistics system syncs instantly with your online store, automatically turning every new order into a generated Waybill (AWB) in seconds.",
      ar: "العمل اليدوي يقتل نمو الشركات. نظامنا اللوجستي الذكي مصمم ليتزامن مع متجرك الإلكتروني بشكل فوري، ليتحول كل طلب جديد إلى بوليصة شحن تلقائياً وفي ثوانٍ.",
    },
    { en: "End-to-End Automation", ar: "خدمة متكاملة لطلباتك", style: "h3" },
    {
      en: "Auto-pull customer data, instantly issue AWBs, and push real-time tracking updates directly to your store's dashboard.",
      ar: "سحب تلقائي لبيانات العميل، إصدار فوري لبوالص الشحن (AWB)، وتحديث لحظي لحالة الطلب داخل متجرك.",
    },
    { en: "One-Click Platform Integration", ar: "منصات مدعومة بضغطة زر", style: "h3" },
    {
      en: "Our system natively supports e-commerce giants: Shopify and WooCommerce, plus a highly flexible Custom API for seamless integration with custom-built stores and independent platforms.",
      ar: "يتوافق نظامنا مع عمالقة التجارة الإلكترونية: شوبيفاي (Shopify)، ووكمرس (WooCommerce)، بالإضافة إلى توفر واجهة برمجية (API) مرنة للربط مع المتاجر المبرمجة ببرمجيات خاصة.",
    },
    {
      en: "Automate your entire shipping process in under 60 seconds! No more manual entry, no more address typos. Your store is ready to connect with just a click.",
      ar: "أتمم عمليات شحنك بالكامل في أقل من 60 ثانية! لا مزيد من إدخال البيانات يدوياً، ولا أخطاء في العناوين. متجرك جاهز للربط بضغطة زر.",
      style: "blockquote",
    },
  ],
  "service-analytics-reports": [
    {
      en: "We don't just give you a tracking screen; we empower you with a Business Intelligence (BI) tool that puts every detail of your trade under the microscope.",
      ar: "نحن لا نقدم لك مجرد شاشة لتتبع الطرود، بل نمنحك أداة لمتابعة أعمالك (Business Intelligence) تضع كل تفاصيل تجارتك تحت المجهر.",
    },
    { en: "Real-Time Sales Analytics", ar: "تحليلات لحظية للمبيعات", style: "h3" },
    {
      en: "Track delivery success rates and pinpoint the exact reasons for returns so you can optimize operations instantly.",
      ar: "تتبع نسبة الشحنات الناجحة، وتعرف على أسباب المرتجعات لتقليلها فوراً.",
    },
    { en: "Transparent Financial Reporting", ar: "تقارير مالية شفافة", style: "h3" },
    {
      en: "Track your Cash on Delivery (COD) accurately. Get crystal-clear visibility on upcoming settlement dates and bank transfers.",
      ar: "تابع مستحقاتك المالية (COD) بدقة، وتعرف على مواعيد التسوية والتحويلات القادمة بوضوح تام.",
    },
    {
      en: "Your data is your wealth. Stop operating in the dark and take full control of your returns, shipments, and COD collections from one smart dashboard.",
      ar: "بياناتك هي ثروتك. توقف عن العمل بعشوائية وسيطر على مرتجعاتك، شحناتك، وأموالك المحصلة (COD) من شاشة واحدة ذكية.",
      style: "blockquote",
    },
  ],
  "service-shipment-types": [
    {
      en: "A damaged product equals an angry customer and a financial loss. That's why we've developed strict shipping and packaging protocols tailored to every specific product category:",
      ar: "المنتج التالف يعني عميلاً غاضباً وخسارة مالية. لذلك، طورنا بروتوكولات شحن وتغليف صارمة تناسب كل فئة من المنتجات:",
    },
    { en: "Experts in Handling Sensitive Products", ar: "تخصصنا في نقل المنتجات الحساسة", style: "h3" },
    {
      en: "Beauty & Cosmetics: Transported in climate-aware environments that protect against temperature fluctuations and prevent liquid/oil leaks.",
      ar: "منتجات التجميل والعناية: تنقل في بيئة تحميها من تقلبات الحرارة وتمنع تسريب السوائل والزيوت.",
    },
    {
      en: "Supplements & Vitamins: Strict adherence to health standards to ensure the product arrives safely and maintains its efficacy.",
      ar: "المكملات الغذائية والفيتامينات: التزام تام بالمعايير الصحية لضمان وصول المنتج آمناً وفعالاً.",
    },
    {
      en: "Electronics & Fragile Devices: Utilizing double-layered Bubble Wrap for maximum shock and vibration absorption.",
      ar: "الإلكترونيات والأجهزة الدقيقة: استخدام طبقات مضاعفة من التغليف لتوفير الحماية القصوى من الصدمات والاهتزازات.",
    },
    { en: "Sizes & Dimensions for Every Need", ar: "مقاسات وأحجام تناسب كل شحنة", style: "h3" },
    {
      en: "For the Local Market: Tear-resistant shipping flyers (Small, Medium, Large) and reinforced corrugated boxes custom-made for heavy or fragile shipments.",
      ar: "للسوق المحلي: نوفر أكياس شحن (فلايرات) غير قابلة للتمزق بمقاسات (صغير، متوسط، كبير)، وصناديق كرتونية مقواة ومخصصة للشحنات الثقيلة أو القابلة للكسر.",
    },
    {
      en: "For the International Market: Comprehensive support for all weights, from small parcels (0.5 kg) up to massive air freight shipments (by the ton). We strictly apply IATA-approved packaging standards to guarantee swift customs clearance.",
      ar: "للسوق الدولي: دعم كامل لكافة الأوزان، بدءاً من الطرود الصغيرة (0.5 كجم) وحتى شحنات الشحن الجوي الكبيرة (بالطن). نطبق معايير التغليف المعتمدة من IATA لضمان تخليص جمركي سريع.",
    },
    {
      en: "Your valuable products deserve packaging that reflects your brand's prestige and protects them from damage. Don't risk your reputation; ship your sensitive products with experts who understand their worth.",
      ar: "منتجاتك القيمة تستحق تغليفاً يعكس مكانة علامتك التجارية ويحميها من التلف. لا تخاطر بسمعتك؛ اشحن منتجاتك الحساسة مع خبراء يقدّرون قيمتها.",
      style: "blockquote",
    },
  ],
};

// ---------------------------------------------------------------------------
// FAQs (replaces the 8 placeholder faqItem docs)
// ---------------------------------------------------------------------------

const faqGroups = [
  {
    categoryEn: "Domestic Shipping & COD Remittance",
    categoryAr: "الشحن الداخلي والتحصيل النقدي (COD)",
    items: [
      {
        qEn: "What governorates does Telegraph Express cover for e-commerce in Egypt?",
        qAr: "ما هي المحافظات التي تغطيها تليجراف إكسبريس للمتاجر الإلكترونية في مصر؟",
        aEn: "We deliver to 23 Egyptian governorates, bridging the gap between major metropolitan hubs and remote districts. Our pricing structure is 100% transparent—zero hidden fees to ensure your profit margins remain stable.",
        aAr: "نغطي 23 محافظة مصرية، لنربط بين المدن الكبرى والمراكز البعيدة بشبكة توصيل موثوقة. نعتمد تسعيراً شفافاً بنسبة 100% بدون أي رسوم خفية لضمان استقرار هوامش أرباح متجرك.",
      },
      {
        qEn: "How fast will my e-commerce customers receive their orders?",
        qAr: "ما هي سرعة توصيل طرود التجارة الإلكترونية للعملاء؟",
        aEn: "We operate on a strict Next-Day Delivery promise. Any order confirmed before 12:00 PM is picked up the same day and handed to your customer within 24 hours.",
        aAr: "نعمل بمعيار التوصيل في اليوم التالي لأي طلب يتم تأكيده قبل الساعة 12:00 ظهراً، نقوم باستلامه في نفس اليوم ليكون بين يدي عميلك خلال 24 ساعة في المحافظات الرئيسية.",
      },
      {
        qEn: "How quickly do merchants receive their Cash on Delivery (COD) payouts?",
        qAr: "كيف ومتى يتم تحويل أموال الدفع عند الاستلام (COD) للتجار؟",
        aEn: "We know liquidity is the lifeline of your business. We accelerate your cash flow by remitting COD payments 3 times a week via direct bank transfer, digital wallets, or instant cash pickup at our branches.",
        aAr: "ندرك أن السيولة المالية هي شريان عملك. لذلك، نقوم بتحويل مدفوعاتك 3 مرات أسبوعياً بأسرع دورة رأس مال في السوق، عبر التحويل البنكي، المحافظ الإلكترونية، أو الاستلام النقدي المباشر من فروعنا.",
      },
      {
        qEn: "What is your protocol for order exchanges and returns?",
        qAr: "كيف تديرون المرتجعات وطلبات الاستبدال لعملاء المتاجر؟",
        aEn: "We offer a seamless \"Item-for-Item\" Exchange right at the customer's doorstep, minimizing customer service friction. Failed deliveries are rapidly restocked into your inventory to eliminate dead stock and reduce losses.",
        aAr: "نوفر خدمة الاستبدال الفوري (طرد مقابل طرد) على باب العميل، مما يقلل احتكاك خدمة العملاء لديك. أما المرتجعات النهائية، فتعود لمخزونك بسرعة فائقة لتقليل الهدر وتقليص الخسائر.",
      },
    ],
  },
  {
    categoryEn: "API Integration & Tech Architecture",
    categoryAr: "الربط التقني وأتمتة المتاجر",
    items: [
      {
        qEn: "Can your system integrate with Shopify?",
        qAr: "هل يتوافق نظامكم مع منصات شوبيفاي (Shopify)؟",
        aEn: "Yes. Our smart logistics architecture features seamless, one-click API integration with the MENA region's top e-commerce ecosystems, including Shopify and WooCommerce.",
        aAr: "بالتأكيد. تمتلك تليجراف بنية تقنية تتيح الربط البرمجي (API) السلس مع كبرى منصات التجارة الإلكترونية في الشرق الأوسط مثل Shopify، و WooCommerce وغيرها.",
      },
      {
        qEn: "Do I have to generate Air Waybills (AWBs) manually?",
        qAr: "هل أحتاج لإصدار بوالص الشحن (AWB) يدوياً؟",
        aEn: "Never. Once a customer checks out, our system automatically pulls the data and generates the AWB in seconds. Order statuses synchronize live within your dashboard, updating to \"Delivered\" instantly upon handover.",
        aAr: "أبداً. بمجرد إتمام العميل للطلب في متجرك، يقوم نظامنا بسحب البيانات تلقائياً وإصدار بوليصة الشحن (AWB) في ثوانٍ، مع تحديث حالة الطلب لحظياً في لوحة تحكمك إلى \"تم التوصيل\" فور الاستلام.",
      },
    ],
  },
  {
    categoryEn: "E-commerce Fulfillment & Warehousing",
    categoryAr: "التخزين وتجهيز الطلبات",
    items: [
      {
        qEn: "What 3PL fulfillment services do you provide?",
        qAr: "ما هي خدمات التخزين وتجهيز الطلبات التي تقدمونها؟",
        aEn: "We offer an end-to-end operational engine for e-commerce brands: inbound freight receiving, highly secure warehousing, and rapid Pick & Pack management the second an order drops into your store.",
        aAr: "نوفر محركاً تشغيلياً متكاملاً لشركات التجارة الإلكترونية يبدأ من استلام وتأمين المخزون، وصولاً إلى الإدارة الكاملة لعمليات الالتقاط والتغليف فور تسجيل الطلب بمتجرك.",
      },
      {
        qEn: "How do you protect cosmetics and supplements during the summer heat?",
        qAr: "كيف تضمنون سلامة مستحضرات التجميل والمكملات الغذائية في فصل الصيف؟",
        aEn: "We enforce strict temperature-controlled protocols within our warehouses and transit fleet. This guarantees your heat-sensitive products reach customers safely, ensuring active ingredients remain potent and packaging stays leak-free.",
        aAr: "نطبق بروتوكولات تنظيمية داخل مستودعاتنا وأثناء النقل. هذا يضمن وصول المنتجات الحساسة للحرارة لعملائك دون أي تلف للمادة الفعالة أو تسريب للعبوات.",
      },
    ],
  },
  {
    categoryEn: "Global Air Freight & Customs Brokerage",
    categoryAr: "الشحن الجوي الدولي والتخليص الجمركي",
    items: [
      {
        qEn: "Do you provide international air freight and customs clearance?",
        qAr: "هل تقدمون خدمات الشحن الجوي السريع والتخليص الجمركي للتجار؟",
        aEn: "Yes. We facilitate rapid international routing for small parcels and commercial samples, connecting Egypt to the GCC, Europe, and North America. Our team provides full Door-to-Door Customs Brokerage to insulate your shipments from compliance bottlenecks or delays.",
        aAr: "نعم، نوفر مسارات شحن جوي سريع للطرود الصغيرة والعينات التجارية إلى دول الخليج، أوروبا، وأمريكا الشمالية. ويتولى فريقنا التخليص الجمركي من الباب للباب لتجنيب بضاعتك أي غرامات أو تأخير.",
      },
      {
        qEn: "How do you calculate international shipping rates?",
        qAr: "كيف يتم حساب تكلفة الشحن الدولي الجوي؟",
        aEn: "We use standard aviation metrics, comparing Actual Weight vs. Volumetric (Dimensional) Weight and applying the higher value. Your dedicated account manager will advise you on compact packaging strategies to slash international costs.",
        aAr: "نعتمد المعيار العالمي للمقارنة بين الوزن الفعلي والوزن الحجمي (أيهما أكبر). وسيقوم مدير حسابك بمساعدتك في استخدام تغليف مدمج لتقليل التكلفة الدولية إلى أقصى حد.",
      },
    ],
  },
  {
    categoryEn: "Merchant Onboarding & Account Management",
    categoryAr: "فتح الحسابات والدعم الفني",
    items: [
      {
        qEn: "How fast can I open a merchant account with Telegraph Express?",
        qAr: "كيف أبدأ بفتح حساب تاجر مع تليجراف إكسبريس؟",
        aEn: "The process is fully digital and takes just minutes. Register online, sign your e-contract, and start automating your AWBs on the very same day.",
        aAr: "العملية رقمية بالكامل وتستغرق دقائق. قم بإنشاء حسابك عبر موقعنا، وقع العقد إلكترونياً، وابدأ في أتمتة بوالص الشحن لمتجرك في نفس اليوم.",
      },
      {
        qEn: "Is there dedicated support for enterprise and high-volume stores?",
        qAr: "هل تخصصون دعماً فنياً للمتاجر ذات حجم الطلبات العالي؟",
        aEn: "Yes. Every merchant is assigned a Dedicated Account Manager to optimize daily dispatch and delivery quality. We also unlock exclusive, highly competitive pricing tiers for stores exceeding 300 orders per month.",
        aAr: "نعم، نُعين مدير حسابات مخصص لكل متجر لمتابعة العمليات اليومية وضمان جودة التسليم، مع تقديم خطط تسعير تنافسية حصرية للمتاجر التي تتجاوز 300 شحنة شهرياً.",
      },
    ],
  },
];

const OLD_FAQ_IDS = Array.from({ length: 8 }, (_, i) => `faqItem-faq_${String(i + 1).padStart(3, "0")}`);

async function run() {
  // About + Services pages
  await client.createOrReplace(aboutPage);
  console.log(`✓ sitePage-about (${aboutPage.sections.length} sections)`);
  await client.createOrReplace(servicesPage);
  console.log(`✓ sitePage-services (${servicesPage.sections.length} sections)`);

  // Service detail bodies
  for (const [id, items] of Object.entries(serviceBodies)) {
    await client.patch(id).set({ body: richContent(items) }).commit();
    console.log(`✓ ${id} body (${items.length} blocks)`);
  }

  // FAQs: delete old placeholders, create new grouped set
  for (const id of OLD_FAQ_IDS) {
    await client.delete(id).catch(() => {});
  }
  console.log(`✓ deleted ${OLD_FAQ_IDS.length} placeholder FAQ items`);

  let order = 1;
  for (const group of faqGroups) {
    for (const item of group.items) {
      const id = `faqItem-migrated-${order}`;
      await client.createOrReplace({
        _id: id,
        _type: "faqItem",
        category: loc(group.categoryEn, group.categoryAr),
        question: loc(item.qEn, item.qAr),
        answer: locText(item.aEn, item.aAr),
        order,
      });
      order++;
    }
  }
  console.log(`✓ created ${order - 1} new FAQ items across ${faqGroups.length} categories`);

  console.log("done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
