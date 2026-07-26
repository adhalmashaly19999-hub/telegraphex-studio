import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../../validators/requireBothLanguages'

export default defineType({
  name: 'landingCta',
  title: 'Call-to-Action Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: requireBothLanguages('headings'),
    }),
    defineField({name: 'subheading', title: 'Subheading', type: 'localeText'}),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'localeString',
      validation: requireBothLanguages('button labels'),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'An internal path (e.g. /get-started) or a full https:// URL.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading.en'},
    prepare: ({title}) => ({title: `CTA: ${title || 'Untitled'}`}),
  },
})
