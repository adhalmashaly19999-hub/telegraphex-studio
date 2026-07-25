import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'deliveryZone',
  title: 'Delivery Zone',
  type: 'document',
  fields: [
    defineField({name: 'zone', title: 'Zone Name', type: 'localeString'}),
    defineField({name: 'areas', title: 'Areas Included', type: 'localeText'}),
    defineField({name: 'deliveryTime', title: 'Delivery Time', type: 'localeString'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'zone.en', subtitle: 'deliveryTime.en'},
  },
})
