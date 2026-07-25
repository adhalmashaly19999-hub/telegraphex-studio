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
              title: 'Icon',
              type: 'string',
              description:
                'Must match a name the website actually recognizes (see app/src/lib/serviceVisuals.ts) — picking from this list is what keeps that in sync.',
              options: {
                list: [
                  'MapPin', 'CreditCard', 'Route', 'Zap', 'Clock', 'Package',
                  'RotateCcw', 'ArrowLeftRight', 'Globe', 'Code2', 'BarChart3', 'Layers',
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (Rule) =>
                Rule.custom((value: {en?: string; ar?: string} | undefined) => {
                  if (!value?.en || !value?.ar) return 'Both English and Arabic titles are required.';
                  return true;
                }),
            }),
            defineField({
              name: 'desc',
              title: 'Description',
              type: 'localeText',
              validation: (Rule) =>
                Rule.custom((value: {en?: string; ar?: string} | undefined) => {
                  if (!value?.en || !value?.ar) return 'Both English and Arabic descriptions are required.';
                  return true;
                }),
            }),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
    }),

    defineField({name: 'coverageHeading', title: 'Coverage Section Heading', type: 'localeString'}),

    defineField({name: 'statsHeading', title: 'Stats Section Heading', type: 'localeString'}),
    defineField({name: 'statsSubtitle', title: 'Stats Section Subtitle', type: 'localeText'}),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value (e.g. 983K, 2240, 23)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localeString',
              validation: (Rule) =>
                Rule.custom((value: {en?: string; ar?: string} | undefined) => {
                  if (!value?.en || !value?.ar) return 'Both English and Arabic labels are required.';
                  return true;
                }),
            }),
          ],
          preview: {select: {title: 'label.en', subtitle: 'value'}},
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
