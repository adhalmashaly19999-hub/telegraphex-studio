import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../../validators/requireBothLanguages'

export default defineType({
  name: 'landingImageText',
  title: 'Image + Text',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: requireBothLanguages('headings'),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localeText',
      validation: requireBothLanguages('text bodies'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {list: ['left', 'right']},
      initialValue: 'left',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading.en'},
    prepare: ({title}) => ({title: `Image + Text: ${title || 'Untitled'}`}),
  },
})
