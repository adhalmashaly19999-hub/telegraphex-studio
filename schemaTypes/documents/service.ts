import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon name (lucide-react)',
      type: 'string',
      description: 'e.g. MapPin, CreditCard, Route, Package, RotateCcw, BarChart3',
    }),
    defineField({
      name: 'color',
      title: 'Accent color',
      type: 'string',
      options: {list: ['red', 'green', 'gold']},
    }),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'desc', title: 'Short Description', type: 'localeText'}),
    defineField({
      name: 'features',
      title: 'Feature Bullets',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on homepage preview',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'color'},
  },
})
