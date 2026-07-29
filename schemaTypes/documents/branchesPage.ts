import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'
import {heroBackgroundFields} from '../shared/heroBackgroundFields'

export default defineType({
  name: 'branchesPage',
  title: 'Branches Page',
  type: 'document',
  description: 'The hero copy on /branches. The branch list itself is managed under Branch.',
  fields: [
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'localeText', validation: requireBothLanguages('subheadings')}),
    ...heroBackgroundFields(),
  ],
  preview: {
    prepare: () => ({title: 'Branches Page'}),
  },
})
