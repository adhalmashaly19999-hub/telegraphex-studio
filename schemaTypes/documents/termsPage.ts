import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'

export default defineType({
  name: 'termsPage',
  title: 'Terms of Service Page',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Page Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Label',
      description: 'e.g. "Last updated: 2026"',
      type: 'localeString',
      validation: requireBothLanguages('last-updated labels'),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'termsSection',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: requireBothLanguages('titles'),
            }),
            defineField({
              name: 'items',
              title: 'Bullet Points',
              type: 'array',
              of: [{type: 'localeString'}],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'packagingPricesHeading',
      title: 'Packaging Prices Heading',
      type: 'localeString',
      validation: requireBothLanguages('headings'),
    }),
    defineField({
      name: 'packagingPrices',
      title: 'Packaging Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'packagingPrice',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localeString',
              validation: requireBothLanguages('labels'),
            }),
            defineField({
              name: 'price',
              title: 'Price (EGP)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {select: {title: 'label.en', subtitle: 'price'}},
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Terms of Service Page'}),
  },
})
