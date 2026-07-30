import {defineType, defineField} from 'sanity'

/**
 * One flexible schema reused across every static marketing page (About,
 * Services, Careers, Get Started, Contact, Branches, Coverage, Privacy,
 * Terms, FAQ). Each page is a document of this type with a fixed `pageKey`
 * and its own free-form `sections` array — add, remove, and reorder any
 * mix of the block types below, exactly like the Landing Page builder.
 *
 * Home and Track keep their own dedicated schemas instead of this one:
 * both have a search widget fused directly into their hero (tracking
 * number input), which doesn't fit a generic content block.
 *
 * No metaTitle/metaDescription here on purpose — per-path SEO for these
 * exact routes is already owned by SEO Settings > pages, so this doesn't
 * duplicate it.
 */
export default defineType({
  name: 'sitePage',
  title: 'Site Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      description: 'Add, remove, and reorder sections to build this page. Mix and match freely.',
      type: 'array',
      of: [
        {type: 'landingHero'},
        {type: 'landingRichText'},
        {type: 'landingImageText'},
        {type: 'landingFeatureGrid'},
        {type: 'landingCta'},
        {type: 'landingFormEmbed'},
        {type: 'blockWidget'},
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {pageKey: 'pageKey', sections: 'sections'},
    prepare: ({pageKey, sections}) => ({
      title: pageKey ? pageKey.charAt(0).toUpperCase() + pageKey.slice(1) : 'Site Page',
      subtitle: `${sections?.length ?? 0} section(s)`,
    }),
  },
})
