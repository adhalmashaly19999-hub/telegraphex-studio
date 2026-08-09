import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category (optional)',
      description: 'Groups this FAQ under a heading on the FAQ page, e.g. "Domestic Shipping & COD". Leave empty to list it ungrouped.',
      type: 'localeString',
    }),
    defineField({name: 'question', title: 'Question', type: 'localeString'}),
    defineField({name: 'answer', title: 'Answer', type: 'localeText'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'question.en', subtitle: 'category.en'},
  },
})
