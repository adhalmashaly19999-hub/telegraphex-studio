import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Client Name', type: 'string'}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({name: 'quote', title: 'Quote', type: 'localeText'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'quote.en', media: 'logo'},
  },
})
