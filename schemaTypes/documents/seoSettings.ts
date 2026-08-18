import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', title: 'Site Name (used in title suffix)', type: 'string'}),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: 'The small icon shown in browser tabs. Square image works best (e.g. 512x512).',
      type: 'image',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Social Share Image',
      description: 'Used on any page that does not have its own image set below. Recommended size: 1200x630.',
      type: 'image',
    }),
    defineField({
      name: 'typography',
      title: 'Typography',
      description: 'Font + size for each heading level and body text, controlled independently. Curated font list so nothing loads broken.',
      type: 'object',
      fields: [
        defineField({name: 'h1', title: 'H1 — Largest headings (page titles, hero text)', type: 'typographyLevel'}),
        defineField({name: 'h2', title: 'H2 — Section headings', type: 'typographyLevel'}),
        defineField({name: 'h3', title: 'H3 — Sub-headings', type: 'typographyLevel'}),
        defineField({name: 'body', title: 'Body — Paragraph text (size also scales everything else site-wide)', type: 'typographyLevel'}),
        defineField({
          name: 'arabicFont',
          title: 'Arabic Font (used everywhere in Arabic, all levels)',
          description: 'Arabic uses one flexible typeface across headings and body rather than a separate font per level.',
          type: 'string',
          options: {
            list: [
              {title: 'Cairo', value: 'cairo'},
              {title: 'Tajawal', value: 'tajawal'},
              {title: 'IBM Plex Sans Arabic', value: 'ibmPlexArabic'},
              {title: 'Noto Naskh Arabic (serif)', value: 'notoNaskh'},
            ],
          },
          initialValue: 'cairo',
        }),
      ],
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics Measurement ID',
      description:
        'GA4 Measurement ID, e.g. G-XXXXXXXXXX. Found in Google Analytics under Admin > Data Streams > (your web stream). Leave empty to disable tracking.',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^G-[A-Z0-9]+$/, {name: 'GA4 Measurement ID', invert: false}).warning(
          'Expected a GA4 Measurement ID starting with "G-" (e.g. G-ABC123XYZ).',
        ),
    }),
    defineField({
      name: 'metaPixelId',
      title: 'Meta (Facebook) Pixel ID',
      description:
        'Numeric Pixel ID from Meta Events Manager (Facebook Business > Events Manager > your pixel). Leave empty to disable tracking.',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\d+$/, {name: 'Meta Pixel ID', invert: false}).warning(
          'Expected a numeric Pixel ID (e.g. 1234567890123456).',
        ),
    }),
    defineField({
      name: 'pages',
      title: 'Per-Page SEO',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'seoPage',
          fields: [
            defineField({
              name: 'path',
              title: 'Path',
              description: 'The route this applies to, e.g. / or /about',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'metaTitle', title: 'Meta Title', type: 'localeString'}),
            defineField({name: 'metaDescription', title: 'Meta Description', type: 'localeText'}),
            defineField({
              name: 'ogImage',
              title: 'Social Share Image (optional override)',
              type: 'image',
            }),
          ],
          preview: {
            select: {title: 'path', subtitle: 'metaTitle.en'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'SEO Settings'}),
  },
})
