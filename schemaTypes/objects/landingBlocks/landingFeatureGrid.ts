import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../../validators/requireBothLanguages'

export default defineType({
  name: 'landingFeatureGrid',
  title: 'Item List (grid / steps / stats / pricing)',
  type: 'object',
  description:
    'One flexible block for any "heading + row of small items" layout — icon grids, numbered process steps, big stat numbers, or a price list. The Display Style controls which of these it renders as.',
  fields: [
    defineField({name: 'heading', title: 'Heading (optional)', type: 'localeString'}),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Icon Grid (e.g. features, reasons)', value: 'grid'},
          {title: 'Numbered Steps (e.g. how it works)', value: 'numbered'},
          {title: 'Big Stat Numbers (e.g. 983K delivered)', value: 'stats'},
          {title: 'Price List (e.g. packaging prices)', value: 'pricing'},
        ],
      },
      initialValue: 'grid',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureGridItem',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (optional)',
              description: 'Only used by the Icon Grid style.',
              type: 'image',
            }),
            defineField({
              name: 'title',
              title: 'Title / Label',
              type: 'localeString',
              validation: requireBothLanguages('titles'),
            }),
            defineField({
              name: 'value',
              title: 'Value (optional)',
              description: 'A number/price shown in large text — e.g. "983K" for a stat, or "150 EGP" for a price. Not used by Icon Grid or Numbered Steps.',
              type: 'string',
            }),
            defineField({name: 'description', title: 'Description (optional)', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.en', subtitle: 'value', media: 'icon'}},
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading.en', items: 'items', style: 'displayStyle'},
    prepare: ({title, items, style}) => ({
      title: `${title || 'Item List'} (${style || 'grid'})`,
      subtitle: `${items?.length ?? 0} item(s)`,
    }),
  },
})
