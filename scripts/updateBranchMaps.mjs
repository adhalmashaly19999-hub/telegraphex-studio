import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const updates = [
  {
    id: "branch-zakat-foundation-main",
    address: { en: "Ali Neda Street, Zakat Foundation", ar: "شارع علي ندا، مؤسسة الزكاة" },
    mapUrl: "https://maps.app.goo.gl/gvfdRzeBS7XvCC8B9?g_st=iw",
  },
  {
    id: "branch-nasr-city",
    address: {
      en: "Building 7, Ramses Extension 3, next to Sekka Club, Nasr City, Cairo",
      ar: "7 عمارات امتداد رمسيس 3 بجوار نادي السكة، مدينة نصر، القاهرة",
    },
    mapUrl: "https://maps.app.goo.gl/GpuD4dPQJX3JaKfh6?g_st=iw",
  },
  {
    id: "branch-jisr-el-suez",
    address: { en: "Attia Gad Street, Jisr El Suez, Cairo", ar: "شارع عطية جاد، جسر السويس، القاهرة" },
    mapUrl: "https://maps.app.goo.gl/ib8kFZz5krRAogcEA?g_st=iw",
  },
  {
    id: "branch-maadi",
    address: { en: "43 Saqr Quraish Buildings, West Maadi, Cairo", ar: "43 عمارات صقر قريش، غرب المعادي، القاهرة" },
    mapUrl: "https://www.google.com/maps?q=29.9848561,31.2871707&z=17&hl=en",
  },
  {
    id: "branch-giza",
    address: {
      en: "7 El Gamal Street, at the start of Faisal Street (corner), Vodafone branch building, ground floor, Giza",
      ar: "7 شارع الجمل، أول شارع فيصل على ناصية الشارع، فرع فودافون، الدور الأرضي، الجيزة",
    },
    mapUrl: "https://www.google.com/maps?q=30.012222290039062,31.19647216796875&z=17&hl=en",
  },
  {
    id: "branch-cairo-admin",
    address: {
      en: "25 Samir Abdel Raouf Street, Makram Ebeid Extension, Nasr City, Cairo",
      ar: "25 سمير عبد الرؤوف، امتداد مكرم عبيد، مدينة نصر، القاهرة",
    },
    mapUrl: "https://www.google.com/maps?q=30.0517493,31.3462739&z=17&hl=en",
  },
];

async function run() {
  for (const u of updates) {
    await client.patch(u.id).set({ address: u.address, mapUrl: u.mapUrl }).commit();
    console.log(`✓ ${u.id}`);
  }
  console.log(`✓ updated ${updates.length} branches`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
