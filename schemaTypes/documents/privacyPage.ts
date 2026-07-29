import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'

export default defineType({
  name: 'privacyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Page Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Label',
      description: 'e.g. "Last updated: January 2026"',
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
          name: 'privacySection',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: requireBothLanguages('titles'),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'localeText',
              validation: requireBothLanguages('content bodies'),
            }),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Privacy Policy Page'}),
  },
})
