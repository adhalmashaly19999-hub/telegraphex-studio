import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingFormEmbed',
  title: 'Embedded Form',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading (optional)', type: 'localeString'}),
    defineField({
      name: 'formId',
      title: 'Tally Form ID',
      type: 'string',
      description: 'The ID from the form\'s Tally URL, e.g. tally.so/r/XXXXXX → "XXXXXX".',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {formId: 'formId'},
    prepare: ({formId}) => ({title: `Embedded Form: ${formId || 'no ID set'}`}),
  },
})
