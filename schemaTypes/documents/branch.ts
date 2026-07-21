import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'localeString'}),
    defineField({name: 'address', title: 'Address', type: 'localeString'}),
    defineField({name: 'governorate', title: 'Governorate', type: 'localeString'}),
    defineField({name: 'city', title: 'City', type: 'localeString'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'hours', title: 'Hours', type: 'localeString'}),
    defineField({name: 'isMain', title: 'Main / HQ Branch', type: 'boolean', initialValue: false}),
    defineField({name: 'lat', title: 'Latitude', type: 'number'}),
    defineField({name: 'lng', title: 'Longitude', type: 'number'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name.en', subtitle: 'city.en'},
  },
})
