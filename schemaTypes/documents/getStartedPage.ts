import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'

export default defineType({
  name: 'getStartedPage',
  title: 'Get Started Page',
  type: 'document',
  description: 'The hero copy on /get-started, above the registration form.',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({name: 'subheading', title: 'Subheading', type: 'localeText', validation: requireBothLanguages('subheadings')}),
  ],
  preview: {
    prepare: () => ({title: 'Get Started Page'}),
  },
})
