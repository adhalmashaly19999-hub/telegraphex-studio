import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'
import {heroBackgroundFields} from '../shared/heroBackgroundFields'

export default defineType({
  name: 'trackPage',
  title: 'Track Page',
  type: 'document',
  description: 'The hero copy on /track, above the tracking search box.',
  fields: [
    defineField({name: 'heroEyebrow', title: 'Hero Eyebrow (small chip above heading)', type: 'localeString', validation: requireBothLanguages('eyebrows')}),
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'localeString', validation: requireBothLanguages('headings')}),
    ...heroBackgroundFields(),
  ],
  preview: {
    prepare: () => ({title: 'Track Page'}),
  },
})
