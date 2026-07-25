import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Client Name', description: 'Used as the alt text only — not shown on the page.', type: 'string'}),
    defineField({name: 'logo', title: 'Logo', type: 'image', validation: (Rule) => Rule.required()}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})
