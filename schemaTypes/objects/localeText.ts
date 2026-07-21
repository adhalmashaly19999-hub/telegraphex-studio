import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Paragraph (EN/AR)',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 3}),
    defineField({name: 'ar', title: 'Arabic', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'en'},
  },
})
