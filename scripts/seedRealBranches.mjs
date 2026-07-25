import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const GENERAL_PHONE = "+20 111 006 4636";
const GENERAL_HOURS = { en: "Saturday – Thursday, 8AM – 10PM", ar: "السبت–الخميس، ٨ص–١٠م" };

const oldFakeBranchIds = [
  "branch-br_001", "branch-br_002", "branch-br_003",
  "branch-br_004", "branch-br_005", "branch-br_006",
];

const branches = [
  {
    slug: "zakat-foundation-main",
    order: 1,
    isMain: true,
    name: {
      en: "Zakat Foundation Branch (Main Sorting, Prep & Stock Center)",
      ar: "فرع مؤسسة الزكاة (مركز الفرز والتحضير الرئيسي والاستوك)",
    },
    address: { en: "Zakat Foundation, Cairo", ar: "مؤسسة الزكاة، القاهرة" },
    governorate: { en: "Cairo", ar: "القاهرة" },
    city: { en: "Zakat Foundation", ar: "مؤسسة الزكاة" },
  },
  {
    slug: "nasr-city",
    order: 2,
    isMain: false,
    name: { en: "Nasr City Branch", ar: "فرع مدينة نصر" },
    address: {
      en: "Ramses Extension Buildings, next to Sekka Club, Nasr City, Cairo",
      ar: "عمارات امتداد رمسيس بجوار نادي السكة، مدينة نصر، القاهرة",
    },
    governorate: { en: "Cairo", ar: "القاهرة" },
    city: { en: "Nasr City", ar: "مدينة نصر" },
  },
  {
    slug: "jisr-el-suez",
    order: 3,
    isMain: false,
    name: { en: "Jisr El Suez Branch", ar: "فرع جسر السويس" },
    address: { en: "Attia Gad Street, Jisr El Suez, Cairo", ar: "شارع عطية جاد، جسر السويس، القاهرة" },
    governorate: { en: "Cairo", ar: "القاهرة" },
    city: { en: "Jisr El Suez", ar: "جسر السويس" },
  },
  {
    slug: "maadi",
    order: 4,
    isMain: false,
    name: { en: "Maadi Branch", ar: "فرع المعادي" },
    address: { en: "Saqr Quraish Buildings, Maadi, Cairo", ar: "عمارات صقر قريش، المعادي، القاهرة" },
    governorate: { en: "Cairo", ar: "القاهرة" },
    city: { en: "Maadi", ar: "المعادي" },
  },
  {
    slug: "giza",
    order: 5,
    isMain: false,
    name: { en: "Giza Branch", ar: "فرع الجيزة" },
    address: { en: "Faisal Street, Giza", ar: "شارع فيصل، الجيزة" },
    governorate: { en: "Giza", ar: "الجيزة" },
    city: { en: "Faisal", ar: "فيصل" },
  },
  {
    slug: "alexandria",
    order: 6,
    isMain: false,
    name: { en: "Alexandria Branch", ar: "فرع الإسكندرية" },
    address: { en: "Abis Al-Zeraai, Alexandria", ar: "أبيس الزراعي، الإسكندرية" },
    governorate: { en: "Alexandria", ar: "الإسكندرية" },
    city: { en: "Abis Al-Zeraai", ar: "أبيس الزراعي" },
  },
  {
    slug: "gharbia-tanta",
    order: 7,
    isMain: false,
    name: { en: "Gharbia Branch", ar: "فرع الغربية" },
    address: { en: "Exhibition Grounds, Tanta, Gharbia", ar: "أرض المعرض، طنطا، الغربية" },
    governorate: { en: "Gharbia", ar: "الغربية" },
    city: { en: "Tanta", ar: "طنطا" },
  },
  {
    slug: "cairo-admin",
    order: 8,
    isMain: false,
    name: { en: "Cairo Administrative Branch", ar: "الفرع الإداري - القاهرة" },
    address: {
      en: "Samir Abdel Raouf St, Makram Ebeid Extension, Nasr City, Cairo",
      ar: "سمير عبد الرؤوف، امتداد مكرم عبيد، مدينة نصر، القاهرة",
    },
    governorate: { en: "Cairo", ar: "القاهرة" },
    city: { en: "Nasr City", ar: "مدينة نصر" },
  },
  {
    slug: "alexandria-admin",
    order: 9,
    isMain: false,
    name: { en: "Alexandria Administrative Branch", ar: "الفرع الإداري - الإسكندرية" },
    address: { en: "Sidi Gaber, El Sheikh Tram, Alexandria", ar: "سيدي جابر، الشيخ ترام، الإسكندرية" },
    governorate: { en: "Alexandria", ar: "الإسكندرية" },
    city: { en: "Sidi Gaber", ar: "سيدي جابر" },
  },
];

async function run() {
  for (const id of oldFakeBranchIds) {
    await client.delete(id);
  }
  console.log(`✓ removed ${oldFakeBranchIds.length} placeholder branches`);

  for (const b of branches) {
    await client.createOrReplace({
      _id: `branch-${b.slug}`,
      _type: "branch",
      name: b.name,
      address: b.address,
      governorate: b.governorate,
      city: b.city,
      phone: GENERAL_PHONE,
      hours: GENERAL_HOURS,
      isMain: b.isMain,
      order: b.order,
    });
  }
  console.log(`✓ seeded ${branches.length} real branches`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
