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
    _id: "companyInfo",
    _type: "companyInfo",
    phone: "+201110064636",
    phoneDisplay: "+20 111 006 4636",
    salesPhone: "+201279021090",
    salesPhoneDisplay: "+20 127 902 1090",
    whatsappNumber: "201110064636",
    email: "Help@telegraphex.com",
    address: loc("15 Ramses St, Downtown Cairo", "١٥ شارع رمسيس، وسط البلد، القاهرة"),
    hours: loc("Saturday – Thursday, 8AM – 10PM", "السبت–الخميس، ٨ص–١٠م"),
    taxId: "474-518-699",
  });
  console.log("✓ seeded companyInfo");

  await client.createOrReplace({
    _id: "privacyPage",
    _type: "privacyPage",
    heading: loc("Privacy Policy", "سياسة الخصوصية"),
    lastUpdated: loc("Last updated: January 2025", "آخر تحديث: يناير 2025"),
    sections: [
      {
        _key: "s1", _type: "privacySection",
        title: loc("Information We Collect", "المعلومات التي نجمعها"),
        content: loc(
          "We collect personal information such as name, email address, phone number, and shipping address when you use our services.",
          "نجمع معلومات شخصية مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف وعنوان الشحن عند استخدامك لخدماتنا."
        ),
      },
      {
        _key: "s2", _type: "privacySection",
        title: loc("How We Use Information", "كيف نستخدم المعلومات"),
        content: loc(
          "We use your information to provide shipping and delivery services, improve your experience, and communicate with you about your orders.",
          "نستخدم معلوماتك لتقديم خدمات الشحن والتوصيل، وتحسين تجربتك، والتواصل معك بشأن طلباتك."
        ),
      },
      {
        _key: "s3", _type: "privacySection",
        title: loc("Data Security", "أمان البيانات"),
        content: loc(
          "We use industry-standard security measures to protect your information from unauthorized access, disclosure, or destruction.",
          "نستخدم تدابير أمان صناعية لحماية معلوماتك من الوصول غير المصرح به أو الكشف أو التدمير."
        ),
      },
      {
        _key: "s4", _type: "privacySection",
        title: loc("Your Rights", "حقوقك"),
        content: loc(
          "You have the right to access, correct, or delete your personal information. You can contact us to exercise these rights.",
          "لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها. يمكنك الاتصال بنا لممارسة هذه الحقوق."
        ),
      },
    ],
  });
  console.log("✓ seeded privacyPage");

  await client.createOrReplace({
    _id: "termsPage",
    _type: "termsPage",
    heading: loc("Telegraph Shipping & Delivery Policies", "سياسات شركة تلغراف لخدمات الشحن والتوصيل"),
    lastUpdated: loc("Last updated: 2026", "آخر تحديث: 2026"),
    sections: [
      {
        _key: "t1", _type: "termsSection",
        title: loc("Pickup Policy", "سياسة البيك أب"),
        items: [
          loc(
            "Pickup requests are created through our website, the app, or by contacting the company — either the day before or the same day before 12 PM for same-day pickup — or shipments can be delivered directly to our branch.",
            "يتم طلب مندوب استلام الاوردرات (البيك اب) من خلال انشاء طلب التقاط على الويب سايت الخاص بالشركة أو من خلال الابلكيشن أو من خلالها بيوم قبلها أو في نفس اليوم قبل الساعة 12 ظهرا – لاستلامها في نفس اليوم- أو تسليم الشحنات بمقر الشركة."
          ),
          loc(
            "Pickup service is free starting from 5 orders. If there are fewer than 5, delivery is arranged via one of the company's branches or through a courier for a 50 EGP fee.",
            "خدمة البيك اب مجانية بداية من 5 اوردرات وفي حالة وجود بيك اب اقل من ذلك يتم تسليمه باحدي فروع الشركة او من خلال المندوب بتكلفة 50ج."
          ),
          loc(
            "We do not deal directly with couriers regarding pickup requests or anything related to shipments — the company is not liable for any issue that may occur as a result of doing so.",
            "لا يتم التعامل مباشرة مع المناديب لطلب بيك اب او اي شيء يتعلق بإرسال شحنات وفي حالة حدوث ذلك فالشركة غير مسئولة عن اي اخلال قد يحدث."
          ),
          loc(
            "The delivery timeframe is calculated starting from the day after the shipment is received.",
            "يتم احتساب المدة الزمنية بداية من اليوم التالي لاستلام الشحنات."
          ),
        ].map((v, i) => ({ _key: `t1-${i}`, _type: "localeString", ...v })),
      },
      {
        _key: "t2", _type: "termsSection",
        title: loc("Delivery Policy", "سياسة التوصيل"),
        items: [
          loc(
            "Shipments are received wrapped in a Flyer with the shipping invoice attached. If a shipment is delivered without company packaging or data, the company is not liable for a lost shipment.",
            "يتم استلام الشحنات مغلفة بالفلاير ومرفق بها بوليصة الشحن، وفي حالة تسليمها بدون تغليف الشركة او بدون أي بيانات فالشركة تكون غير مسؤولة عن فقد الشحنة."
          ),
          loc(
            "Shipment creation and tracking is done online through our website or app, or through customer service.",
            "يتم انشاء ومتابعة الشحنات اونلاين من خلال الويب سايت أو الابلكيشن الخاص بالشركة أو من خلال خدمة العملاء."
          ),
          loc(
            "Delivery is attempted three times, on three different working days, according to the courier's route.",
            "يتم محاولة تسليم الشحنة ثلاث مرات في ثلاث ايام عمل مختلفة وفقا لخط سير المندوب."
          ),
          loc(
            "If the sender requests a delayed pickup, the maximum delay period is 6 days. Beyond that, the shipment is returned to the sender.",
            "في حالة طلب المرسل الية تأجيل استلام الشحنة تكون أقصى فترة ممكنة 6 ايام وفي حالة التأجيل لمدة أكثر من ذلك يتم ارجاع الشحنة الي الراسل."
          ),
          loc(
            "Free shipment opening and inspection is available to the recipient, with a maximum courier wait time of 10 minutes — beyond that, the shipment is counted as returned.",
            "متاح خدمة فتح ومعاينة الشحنة مجانا للمرسل اليه علي ان تكون اكبر فترة متاحة لفتح ومعاينة الشحنة 10 دقائق وفي حالة انتظار المندوب اكثر من ذلك يتم احتساب الشحنة مرتجع."
          ),
        ].map((v, i) => ({ _key: `t2-${i}`, _type: "localeString", ...v })),
      },
      {
        _key: "t3", _type: "termsSection",
        title: loc("Collection & Payment", "التحصيل"),
        items: [
          loc(
            "The total value of shipments delivered more than 48 hours prior is collected and settled to the client on the agreed days, per the agreed collection method.",
            "يتم تحصيل إجمالي قيمة الشحنات التي مرّ على تسليمها أكثر من 48 ساعة، وذلك في الأيام المحددة لكل عميل، وفقًا لطريقة التحصيل المتفق عليها."
          ),
          loc(
            "Weekly settlement is made via bank transfer (20 EGP fee on the total transfer amount), or through e-wallets (Vodafone Cash, Etisalat, Orange, WE) also for a 20 EGP transfer fee.",
            "يتم تحصيل التسوية الخاصة بالعملاء أسبوعياً من خلال: تحويل بنكي برسوم 20 ج علي اجمالي التحويل، أو من خلال المحافظ الالكترونية (فودافون – اتصالات – أورانج – وي) برسوم 20ج للتحويل."
          ),
          loc(
            "The maximum value for a single shipment is 3,000 EGP; if exceeded, a 1% collection fee applies (minimum 10 EGP).",
            "الحد الاقصي لثمن الشحنة الواحدة لا يتجاوز 3000 جنيها مصريا وفي حالة تجاوز المبلغ يتم احتساب 1% علي التحصيل بحد ادني 10 ج."
          ),
          loc(
            "The maximum price for a single shipment is 10,000 EGP.",
            "الحد الأقصي لسعر الشحنة الواحدة لا يتجاوز 10,000 جنيها مصريا."
          ),
          loc(
            "Listed prices apply to shipments weighing up to 3kg. An additional 5 EGP is added per extra kg, up to a maximum of 5kg additional.",
            "الاسعار الموضحة سلفا حتى وزن 3 كجم ويتم اضافة مبلغ 5 جنيهات على كل كيلو اضافي بحد أقصي 5 كجم."
          ),
          loc(
            "The maximum shipment size is 40×40×20 cm. Shipments exceeding these dimensions are treated as a new shipment, with additional charges applied.",
            "أكبر حجم للشحنة الواحدة (40*40*20) و في حالة تجاوز حجم الشحنة الأبعاد الخاصة بالشركة يتم اضافة شحنة جديدة ويتم اضافة المصاريف المستحقة عليها."
          ),
          loc(
            "An exchange service (package-for-package) is available for a 15 EGP fee, added to the shipping price.",
            "متاح خدمة الاستبدال (طرد مقابل طرد) مقابل مبلغ 15ج تضاف علي سعر الشحن."
          ),
          loc(
            "Deliveries do not take place during official holidays or bank holidays.",
            "لا تتم التوريدات أثناء الاجازات الرسمية والاجازات البنكية."
          ),
        ].map((v, i) => ({ _key: `t3-${i}`, _type: "localeString", ...v })),
      },
      {
        _key: "t4", _type: "termsSection",
        title: loc("General Terms & Notes", "شروط وملاحظات عامة للخدمة"),
        items: [
          loc(
            "The sender is responsible for packaging their shipments in a way that protects them from cracks, scratches, leakage, or content separation during transport and delivery.",
            "الراسل مسئول عن تغليف شحناته بالشكل الذي يحافظ عليها من الشروخ او الخدوش او الانبعاج او انفصال احد محتوياتها عن باقي الشحنة أثناء عملية النقل و التوصيل."
          ),
          loc(
            "Fragile, breakable products are not shipped. If the sender insists, the company is absolved of liability should damage occur in transit.",
            "لايتم شحن المنتجات القابلة للكسر وفي حالة اصرار الراسل فالشركة تخلي مسؤليتها في حالة حدوث تلف في الشحنة."
          ),
          loc(
            "The company does not deliver food items, chemicals, liquids, or any items that violate Egyptian law. Should this occur, full liability rests with the sender.",
            "لا تقوم الشركة بتوصيل (المأكولات - الكيماويات - المواد السائلة - اي مواد مخالفة للقانون المصري) وفي حالة حدوث ذلك تكون المسئولية كاملة على الراسل."
          ),
          loc(
            "The company is not liable for shipment contents; its responsibility ends once the shipment is delivered to the recipient.",
            "الشركة غير مسئولة عن محتويات الشحنة وتنتهي مسئوليتها بمجرد تسليم الشحنة للمرسل اليه."
          ),
          loc(
            "Storage is available for part of a client's products within company premises, and shipments are dispatched as soon as they are registered in the system.",
            "متاح تخزين جزء من منتجات العميل داخل مقر الشركة وارسالها كشحنات بمجرد تسجيلها علي السيستم."
          ),
          loc(
            "The company does not operate during the weekly holiday (Friday) and some official holidays.",
            "الشركة لا تعمل اثناء العطلة الاسبوعية يوم الجمعة وبعض الاجازات الرسمية."
          ),
          loc(
            "Compensation for a lost shipment is payable within 14 days of the loss date, following the necessary investigations, in accordance with the company's approved terms and conditions.",
            "يتم استحقاق التعويض في حال فقد الشحنة خلال 14 يومًا من تاريخ الفقد، وذلك بعد الانتهاء من التحقيقات اللازمة، ووفقًا للشروط والأحكام المعتمدة من الشركة."
          ),
        ].map((v, i) => ({ _key: `t4-${i}`, _type: "localeString", ...v })),
      },
    ],
    packagingPricesHeading: loc("Packaging Material Pricing", "أسعار مواد التغليف"),
    packagingPrices: [
      { label: loc("Flyer S (35×25 cm)", "فلاير S (35*25)"), price: "2.5" },
      { label: loc("Flyer M (35×45 cm)", "فلاير M (35*45)"), price: "3.5" },
      { label: loc("Flyer L (50×40 cm)", "فلاير L (50*40)"), price: "5" },
      { label: loc("Flyer XL (60×50 cm)", "فلاير XL (60*50)"), price: "6" },
      { label: loc("Box S (20×10×8 cm)", "بوكس S (20*10*8)"), price: "5" },
      { label: loc("Box L (20×13×18 cm)", "بوكس L (20*13*18)"), price: "7" },
    ].map((p, i) => ({ _key: `p${i}`, _type: "packagingPrice", ...p })),
  });
  console.log("✓ seeded termsPage");

  await client.createOrReplace({
    _id: "getStartedPage",
    _type: "getStartedPage",
    heading: loc("Create Your Free Account", "أنشئ حسابك المجاني"),
    subheading: loc(
      "Fill in your details and our team will reach out to get your account set up shortly.",
      "املأ بياناتك وسيتواصل معك فريقنا لإعداد حسابك خلال وقت قصير."
    ),
  });
  console.log("✓ seeded getStartedPage");

  await client.createOrReplace({
    _id: "careersPage",
    _type: "careersPage",
    heroHeading: loc("Join the Telegraph Team", "انضم لفريق تلغراف"),
    heroSubheading: loc(
      "We're building the future of Egyptian logistics — and we want people to build it with us.",
      "نبني مستقبل اللوجستيات المصرية — وعايزين ناس تبنيه معانا."
    ),
    applyHeading: loc("Apply Now", "قدّم الآن"),
    applySubheading: loc(
      "Fill out the form below and our team will be in touch soon.",
      "املأ النموذج وسيتواصل معك فريقنا قريبًا."
    ),
    reasons: [
      {
        icon: "Truck",
        title: loc("A Tech Company First", "شركة تقنية أولاً"),
        description: loc(
          "We build real logistics software — not just another traditional shipping company.",
          "نبني برمجيات لوجستية حقيقية، مش مجرد شركة شحن تقليدية."
        ),
      },
      {
        icon: "Users",
        title: loc("A Fully Egyptian Team", "فريق مصري بالكامل"),
        description: loc(
          "We're Egyptian, we hire Egyptian, and we solve Egyptian problems with real understanding of the local market.",
          "نحن مصريون، نوظف مصريين، ونحل مشاكل مصرية بفهم حقيقي للسوق المحلي."
        ),
      },
      {
        icon: "TrendingUp",
        title: loc("Fast Growth", "نمو سريع"),
        description: loc(
          "From a single branch to a national network — join us in a real growth phase.",
          "من فرع واحد إلى شبكة وطنية — انضم لنا في مرحلة نمو حقيقية."
        ),
      },
    ].map((r, i) => ({ _key: `r${i}`, _type: "careerReason", ...r })),
  });
  console.log("✓ seeded careersPage");

  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    heroHeading: loc("One Platform. Every Shipping Need.", "منصة واحدة. كل احتياجات الشحن."),
    heroSubheading: loc(
      "From pickup to proof-of-delivery, Telegraph handles the complexity so you don't have to.",
      "من الاستلام إلى إثبات التسليم، تلغراف يتولى التعقيد."
    ),
    stepsHeading: loc("How Telegraph Works", "كيف يعمل تلغراف"),
    steps: [
      { title: loc("Create Shipment", "إنشاء الشحنة"), description: loc("Enter pickup and delivery details.", "أدخل تفاصيل الاستلام والتسليم.") },
      { title: loc("We Pick Up", "نستلم"), description: loc("Our courier arrives at your location.", "يصل مندوبنا في الوقت المحدد.") },
      { title: loc("Smart Delivery", "توصيل ذكي"), description: loc("AI routing gets your package to its destination.", "التوجيه الذكي يوصل طردك عبر المسار الأمثل.") },
      { title: loc("Get Paid", "احصل على المدفوعات"), description: loc("Payment is collected and settled within 48 hours.", "يتم تحصيل المدفوعات وإيداعها خلال 48 ساعة.") },
    ].map((s, i) => ({ _key: `st${i}`, _type: "howItWorksStep", ...s })),
  });
  console.log("✓ seeded servicesPage");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
