import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'localeString'}),
    defineField({name: 'heroSubtitle', title: 'Hero Subtitle', type: 'localeText'}),

    defineField({name: 'storyHeading', title: 'Story Heading', type: 'localeString'}),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{type: 'localeText'}],
    }),

    defineField({name: 'valuesHeading', title: 'Values Section Heading', type: 'localeString'}),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'value',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'localeString'}),
            defineField({name: 'desc', title: 'Description', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
    }),

    defineField({name: 'teamHeading', title: 'Team Section Heading', type: 'localeString'}),
  ],
  preview: {
    prepare: () => ({title: 'About Page'}),
  },
})
