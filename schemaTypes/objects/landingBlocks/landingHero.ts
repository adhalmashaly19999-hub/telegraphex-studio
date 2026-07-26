import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../../validators/requireBothLanguages'

export default defineType({
  name: 'landingHero',
  title: 'Hero Banner',
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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'ctaLabel', title: 'Button Label', type: 'localeString'}),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      description: 'An internal path (e.g. /get-started) or a full https:// URL.',
    }),
  ],
  preview: {
    select: {title: 'heading.en'},
    prepare: ({title}) => ({title: `Hero: ${title || 'Untitled'}`}),
  },
})
