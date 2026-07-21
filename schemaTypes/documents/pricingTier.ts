import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'localeString'}),
    defineField({name: 'price', title: 'Price (e.g. "Free", "EGP 499", "Custom")', type: 'localeString'}),
    defineField({name: 'period', title: 'Period (e.g. "/month")', type: 'localeString'}),
    defineField({name: 'desc', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'features',
      title: 'Feature Bullets',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({name: 'featured', title: 'Featured (highlighted tier)', type: 'boolean', initialValue: false}),
    defineField({
      name: 'ctaType',
      title: 'Call-to-action behavior',
      type: 'string',
      options: {list: [{title: 'Link to Accurate login', value: 'login'}, {title: 'Link to Contact page', value: 'contact'}]},
      initialValue: 'login',
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name.en', subtitle: 'price.en'},
  },
})
