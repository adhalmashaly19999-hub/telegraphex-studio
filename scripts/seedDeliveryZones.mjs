import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Sourced from Telegraph's official delivery-time-by-zone reference sheet.
const zones = [
  {
    slug: "cairo-giza",
    zone: { en: "Cairo – Giza", ar: "القاهرة - الجيزة" },
    areas: { en: "Cairo, Giza", ar: "القاهرة، الجيزة" },
    deliveryTime: { en: "24 hours", ar: "24 ساعة" },
  },
  {
    slug: "cairo-giza-outskirts",
    zone: { en: "Cairo & Giza Outskirts", ar: "اطراف القاهرة والجيزة" },
    areas: {
      en: "Tagamoa, Shorouk, Madinaty, El Mostakbal, Badr, Helwan, Madinet El Salam, 15th of May, October, Zayed, El Hadaeq, Imbaba, El Warraq, Boulaq El Dakrour, Smart Village, New Giza",
      ar: "التجمعات، شروق، مدينتي، المستقبل، بدر، حلوان، مدينة السلام، 15 مايو، أكتوبر، زايد، الحدائق، امبابة، الوراق، بولاق الدكرور، القرية الذكية، الجيزة الجديدة",
    },
    deliveryTime: { en: "48 hours", ar: "48 ساعة" },
  },
  {
    slug: "giza-suburbs",
    zone: { en: "Giza Suburbs", ar: "ضواحي الجيزة" },
    areas: {
      en: "El Badrasheen, El Ayat, El Saf, Atfeeh, Abu Rawash, El Nimrus, El Hawamdeya, Saft El Laban",
      ar: "البدرشين، العياط، الصف، اطفيح، ابو رواش، النمرس، الحوامدية، صفط اللبن",
    },
    deliveryTime: { en: "72 hours", ar: "72 ساعة" },
  },
  {
    slug: "alexandria",
    zone: { en: "Alexandria", ar: "الاسكندرية" },
    areas: { en: "Alexandria", ar: "الاسكندرية" },
    deliveryTime: { en: "24 hours", ar: "24 ساعة" },
  },
  {
    slug: "alexandria-outskirts",
    zone: { en: "Alexandria Outskirts", ar: "اطراف الاسكندرية" },
    areas: {
      en: "Amreya, Borg El Arab, King Mariout, El Awayed, Abu Qir, Tousson, El Mamoura",
      ar: "العامرية، برج العرب، كينج مريوط، العوايد، ابو قير، طوسون، المعمورة",
    },
    deliveryTime: { en: "48 hours", ar: "48 ساعة" },
  },
  {
    slug: "canal-cities",
    zone: { en: "Canal Cities", ar: "مدن القناة" },
    areas: { en: "Suez, Ismailia, Port Said", ar: "السويس، الاسماعيلية، بورسعيد" },
    deliveryTime: { en: "48 hours", ar: "48 ساعة" },
  },
  {
    slug: "delta-cities",
    zone: { en: "Delta Cities", ar: "مدن الدلتا" },
    areas: {
      en: "Sharqia, Gharbia, Qalyubia, Monufia, Dakahlia, Beheira, Kafr El Sheikh, Damietta",
      ar: "الشرقية، الغربية، القليوبية، المنوفية، الدقهلية، البحيرة، كفر الشيخ، دمياط",
    },
    deliveryTime: { en: "72 hours", ar: "72 ساعة" },
  },
  {
    slug: "upper-egypt",
    zone: { en: "Upper Egypt", ar: "الصعيد" },
    areas: {
      en: "Fayoum, Beni Suef, Minya, Sohag, Qena, Luxor, Aswan",
      ar: "الفيوم، بني سويف، المنيا، سوهاج، قنا، الاقصر، اسوان",
    },
    deliveryTime: { en: "4 days", ar: "4 ايام" },
  },
  {
    slug: "north-coast-red-sea-new-valley",
    zone: { en: "North Coast, Red Sea & New Valley", ar: "الساحل الشمالي والبحر الاحمر والوادي الجديد" },
    areas: {
      en: "Marsa Matrouh, Hurghada, Sharm El Sheikh, Red Sea, New Valley",
      ar: "مطروح، الغردقة، شرم الشيخ، البحر الاحمر، الوادي الجديد",
    },
    deliveryTime: { en: "5 days", ar: "5 ايام" },
  },
];

async function run() {
  for (const [i, z] of zones.entries()) {
    await client.createOrReplace({
      _id: `deliveryZone-${z.slug}`,
      _type: "deliveryZone",
      zone: z.zone,
      areas: z.areas,
      deliveryTime: z.deliveryTime,
      order: i + 1,
    });
  }
  console.log(`✓ seeded ${zones.length} delivery zones`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
