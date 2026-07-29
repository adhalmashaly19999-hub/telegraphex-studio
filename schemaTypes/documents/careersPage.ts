import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'
import {heroBackgroundFields} from '../shared/heroBackgroundFields'

export default defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'localeText', validation: requireBothLanguages('subheadings')}),
    ...heroBackgroundFields(),
    defineField({name: 'applyHeading', title: '"Apply Now" Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({name: 'applySubheading', title: '"Apply Now" Subheading', type: 'localeText', validation: requireBothLanguages('subheadings')}),
    defineField({
      name: 'reasons',
      title: '"Why Work Here" Reasons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'careerReason',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Must match a name the website actually recognizes (see app/src/lib/serviceVisuals.ts).',
              options: {
                list: [
                  'MapPin', 'CreditCard', 'Route', 'Zap', 'Clock', 'Package',
                  'RotateCcw', 'ArrowLeftRight', 'Globe', 'Code2', 'BarChart3', 'Layers',
                  'Truck', 'Users', 'TrendingUp',
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
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
    prepare: () => ({title: 'Careers Page'}),
  },
})
