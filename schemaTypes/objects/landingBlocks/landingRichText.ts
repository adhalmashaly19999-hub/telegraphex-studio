import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingRichText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Rich Text section'}),
  },
})
