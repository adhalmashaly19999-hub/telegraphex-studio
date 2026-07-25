import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  await client.patch("homePage").set({
    statsHeading: {
      en: "We Grew With Your Steps Alongside Us",
      ar: "كبرنا بخطواتكم معنا",
    },
    statsSubtitle: {
      en: "A journey of success we live with every shipment we deliver and every customer who trusts us.",
      ar: "رحلة نجاح نعيشها مع كل شحنة نوصلها وكل عميل يثق بنا.",
    },
    stats: [
      {
        _type: "stat",
        _key: "stat-1",
        value: "983K",
        label: { en: "Delivered Shipments", ar: "شحنات تم تسليمها" },
      },
      {
        _type: "stat",
        _key: "stat-2",
        value: "2240",
        label: { en: "Current Clients", ar: "العملاء الحاليون" },
      },
      {
        _type: "stat",
        _key: "stat-3",
        value: "23",
        label: { en: "Covered Governorates", ar: "المحافظات المغطاة" },
      },
    ],
  }).commit();
  console.log("✓ homePage stats updated");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
