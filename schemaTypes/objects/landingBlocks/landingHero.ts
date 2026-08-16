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
      name: 'backgroundImages',
      title: 'Background Image(s)',
      description: 'Add one photo for a static background, or several to turn this hero into an auto-advancing slider.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'slideDuration',
      title: 'Seconds Between Slides',
      description: 'Only used when there are 2+ background images.',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(60),
      hidden: ({parent}) => ((parent as {backgroundImages?: unknown[]})?.backgroundImages?.length ?? 0) < 2,
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
