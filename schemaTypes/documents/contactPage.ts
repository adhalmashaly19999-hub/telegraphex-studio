import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'
import {heroBackgroundFields} from '../shared/heroBackgroundFields'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  description: 'The hero copy on /contact. The phone/email/address list itself is managed under Company Contact Info.',
  fields: [
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'localeText', validation: requireBothLanguages('subheadings')}),
    ...heroBackgroundFields(),
  ],
  preview: {
    prepare: () => ({title: 'Contact Page'}),
  },
})
