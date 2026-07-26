import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../../validators/requireBothLanguages'

export default defineType({
  name: 'landingFeatureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'localeString'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureGridItem',
          fields: [
            defineField({name: 'icon', title: 'Icon (optional)', type: 'image'}),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: requireBothLanguages('titles'),
            }),
            defineField({name: 'description', title: 'Description', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.en', media: 'icon'}},
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading.en', items: 'items'},
    prepare: ({title, items}) => ({title: `Feature Grid: ${title || 'Untitled'}`, subtitle: `${items?.length ?? 0} item(s)`}),
  },
})
