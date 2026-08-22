import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const key = () => randomBytes(6).toString("hex");

function block(style, text) {
  return {
    _key: key(),
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: key(), _type: "span", marks: [], text }],
  };
}

const en = [
  block("normal", "Your customers expect their order at the door, fast. Our domestic network is built to make that happen, every day, in every governorate."),
  block("h3", "Nationwide Coverage, Every Day"),
  block("normal", "From same-day drops within Cairo and Alexandria to next-day delivery across every governorate in Egypt, our courier network reaches every corner of the country."),
  block("h3", "Cash on Delivery (COD), Handled"),
  block("normal", "We collect payment from your customer at the doorstep and settle it back to your account on a reliable schedule, so you never have to chase a payment again."),
  block("h3", "Live Tracking, Every Step"),
  block("normal", "Your customers get real-time updates from pickup to delivery, and you get full visibility into every shipment's status from your dashboard."),
  block("blockquote", "Move Forward. Always — wherever your customer is in Egypt, we get you there, on time, every time."),
];

const ar = [
  block("normal", "عملاؤك يتوقعون وصول طلباتهم إلى الباب، وبسرعة. شبكتنا المحلية مصممة لتحقيق ذلك كل يوم، في كل محافظة."),
  block("h3", "تغطية جمهورية كاملة، يومياً"),
  block("normal", "من التسليم في نفس اليوم داخل القاهرة والإسكندرية إلى التسليم في اليوم التالي في جميع محافظات مصر، تصل شبكة مندوبينا إلى كل ركن في البلاد."),
  block("h3", "التحصيل النقدي (COD) بأمان"),
  block("normal", "نقوم بتحصيل المبلغ من العميل عند الاستلام، ونُسوّيه إلى حسابك في مواعيد منتظمة وموثوقة، فلا داعي لملاحقة المستحقات بنفسك."),
  block("h3", "تتبع حي لحظة بلحظة"),
  block("normal", "يحصل عملاؤك على تحديثات لحظية من الاستلام وحتى التسليم، وتحصل أنت على رؤية كاملة لحالة كل شحنة من لوحة التحكم الخاصة بك."),
  block("blockquote", "امضِ قدماً دائماً — أينما كان عميلك في مصر، نصله في الوقت المحدد، في كل مرة."),
];

const body = { _type: "localeBlockContent", en, ar };

for (const id of ["service-domestic-shipping", "drafts.service-domestic-shipping"]) {
  await client.patch(id).set({ body }).commit({ autoGenerateArrayKeys: false }).catch((err) => {
    console.error(`Failed patching ${id}:`, err.message);
  });
  console.log(`Patched ${id}`);
}
