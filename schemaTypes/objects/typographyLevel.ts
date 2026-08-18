import {defineType, defineField} from 'sanity'

const FONT_OPTIONS = [
  {title: 'Poppins', value: 'poppins'},
  {title: 'Inter', value: 'inter'},
  {title: 'Sora', value: 'sora'},
  {title: 'Archivo', value: 'archivo'},
  {title: 'Nunito', value: 'nunito'},
  {title: 'Space Grotesk', value: 'spaceGrotesk'},
  {title: 'Source Sans 3', value: 'sourceSans'},
  {title: 'Playfair Display (serif)', value: 'playfair'},
]

const SIZE_OPTIONS = [
  {title: 'Compact', value: 'compact'},
  {title: 'Default', value: 'default'},
  {title: 'Large', value: 'large'},
]

/** One reusable "font + size" pair — used for H1, H2, H3, and Body independently. */
export default defineType({
  name: 'typographyLevel',
  title: 'Typography Level',
  type: 'object',
  fields: [
    defineField({
      name: 'font',
      title: 'Font',
      type: 'string',
      options: {list: FONT_OPTIONS},
      initialValue: 'poppins',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {list: SIZE_OPTIONS},
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {font: 'font', size: 'size'},
    prepare: ({font, size}) => ({title: `${font || 'poppins'} · ${size || 'default'}`}),
  },
})
