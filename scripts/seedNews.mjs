import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: "d0pmwph2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seedSampleArticle() {
  const coverImage = await uploadImage(
    path.resolve(__dirname, "../../app/src/assets/hero-truck.webp")
  );

  await client.createOrReplace({
    _id: "newsArticle-sample-welcome",
    _type: "newsArticle",
    title: {
      en: "Welcome to the New Telegraph News Page",
      ar: "مرحباً بكم في صفحة أخبار تلغراف الجديدة",
    },
    slug: { current: "welcome-to-telegraph-news" },
    coverImage,
    excerpt: {
      en: "This is a sample article — edit or delete it in Sanity Studio, and add your own news whenever you like.",
      ar: "هذا مقال تجريبي — يمكنك تعديله أو حذفه من Sanity Studio، وإضافة أخباركم الخاصة في أي وقت.",
    },
    body: {
      en: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [{ _type: "span", _key: "s1", text: "This news page is fully editable from Sanity Studio. You can add a title, a cover image, a short preview excerpt, and rich body content — including headings, bold and italic text, bullet lists, quotes, links, and even inline images inside the article body." }],
        },
        {
          _type: "block",
          _key: "b2",
          style: "h2",
          children: [{ _type: "span", _key: "s2", text: "How it works" }],
        },
        {
          _type: "block",
          _key: "b3",
          style: "normal",
          children: [{ _type: "span", _key: "s3", text: "Every article you publish here shows up automatically on the live website's News page, in both English and Arabic. Feel free to delete this sample and start writing your first real update." }],
        },
      ],
      ar: [
        {
          _type: "block",
          _key: "b1a",
          style: "normal",
          children: [{ _type: "span", _key: "s1a", text: "هذه الصفحة الإخبارية قابلة للتعديل بالكامل من Sanity Studio. يمكنك إضافة عنوان، وصورة غلاف، ونبذة قصيرة، ومحتوى غني — يشمل عناوين، نص عريض ومائل، قوائم نقطية، اقتباسات، روابط، وحتى صور داخل نص المقال." }],
        },
        {
          _type: "block",
          _key: "b2a",
          style: "h2",
          children: [{ _type: "span", _key: "s2a", text: "كيف تعمل" }],
        },
        {
          _type: "block",
          _key: "b3a",
          style: "normal",
          children: [{ _type: "span", _key: "s3a", text: "كل مقال تنشره هنا يظهر تلقائياً في صفحة الأخبار على الموقع، باللغتين العربية والإنجليزية. لا تتردد في حذف هذا المقال التجريبي والبدء بكتابة أول تحديث حقيقي." }],
        },
      ],
    },
    author: "Telegraph Team",
    publishedAt: new Date().toISOString(),
    featured: false,
  });
  console.log("✓ sample news article seeded");
}

seedSampleArticle().catch((err) => {
  console.error(err);
  process.exit(1);
});
