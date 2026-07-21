import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Text (EN/AR)',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'string'}),
    defineField({name: 'ar', title: 'Arabic', type: 'string'}),
  ],
  preview: {
    select: {title: 'en'},
  },
})
