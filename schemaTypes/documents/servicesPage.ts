import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'
import {heroBackgroundFields} from '../shared/heroBackgroundFields'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  description: 'The hero and "How Telegraph Works" content on /services. The service cards themselves are managed under Service, not here.',
  fields: [
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'localeText', validation: requireBothLanguages('subheadings')}),
    ...heroBackgroundFields(),
    defineField({name: 'stepsHeading', title: '"How It Works" Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({
      name: 'steps',
      title: '"How It Works" Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'howItWorksStep',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: requireBothLanguages('titles'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localeText',
              validation: requireBothLanguages('descriptions'),
            }),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Services Page'}),
  },
})
