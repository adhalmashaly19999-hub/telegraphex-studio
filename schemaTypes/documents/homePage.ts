import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'localeString'}),
    defineField({name: 'heroSubtitle', title: 'Hero Subtitle', type: 'localeText'}),

    defineField({name: 'servicesHeading', title: 'Services Section Heading', type: 'localeString'}),
    defineField({name: 'servicesSubtitle', title: 'Services Section Subtitle', type: 'localeText'}),

    defineField({name: 'whyHeading', title: '"Why Us" Heading', type: 'localeString'}),
    defineField({name: 'whySubtitle', title: '"Why Us" Subtitle', type: 'localeText'}),
    defineField({
      name: 'whyFeatures',
      title: '"Why Us" Feature Points',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'whyFeature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon name (lucide-react)',
              type: 'string',
              description: 'e.g. Zap, Clock, CreditCard, Package, RotateCcw, ArrowLeftRight',
            }),
            defineField({name: 'title', title: 'Title', type: 'localeString'}),
            defineField({name: 'desc', title: 'Description', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
    }),

    defineField({name: 'coverageHeading', title: 'Coverage Section Heading', type: 'localeString'}),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
