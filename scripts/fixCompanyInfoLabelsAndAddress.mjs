import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  const doc = await client.getDocument("companyInfo");
  if (!doc) throw new Error("companyInfo document not found");

  await client
    .patch("companyInfo")
    .set({
      supportPhone: doc.salesPhone,
      supportPhoneDisplay: doc.salesPhoneDisplay,
      address: {
        _type: "localeString",
        en: "25 Samir Abdel Raouf Street, Makram Ebeid Extension, Nasr City, Cairo",
        ar: "25 سمير عبد الرؤوف، امتداد مكرم عبيد، مدينة نصر، القاهرة",
      },
    })
    .unset(["salesPhone", "salesPhoneDisplay"])
    .commit();

  console.log("✓ renamed salesPhone -> supportPhone and updated the office address");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
