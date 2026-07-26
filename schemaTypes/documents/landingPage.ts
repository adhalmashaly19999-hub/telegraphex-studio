import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page (Campaigns)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      description: 'For your own reference in the Studio list — not shown on the page itself.',
      type: 'localeString',
      validation: requireBothLanguages('titles'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'The page will be live at telegraphex.com/lp/<slug>.',
      type: 'slug',
      options: {source: 'title.en', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      description: 'Off by default so you can build a campaign page ahead of time without it being publicly reachable yet. Turn on when ready to go live.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      description: 'Shown in the browser tab and search results. Falls back to the internal title if left blank.',
      type: 'localeString',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'localeText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      description: 'Shown when this page is shared on WhatsApp, Facebook, etc. Recommended size: 1200x630.',
      type: 'image',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      description: 'Add and reorder sections to build the page. Mix and match freely.',
      type: 'array',
      of: [
        {type: 'landingHero'},
        {type: 'landingRichText'},
        {type: 'landingImageText'},
        {type: 'landingFeatureGrid'},
        {type: 'landingCta'},
        {type: 'landingFormEmbed'},
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {title: 'Title', name: 'titleAsc', by: [{field: 'title.en', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'slug.current', published: 'published'},
    prepare: ({title, subtitle, published}) => ({
      title: title || 'Untitled',
      subtitle: `/lp/${subtitle ?? ''} ${published ? '' : '(draft)'}`.trim(),
    }),
  },
})
