import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'localeString'}),
    defineField({name: 'heroSubtitle', title: 'Hero Subtitle', type: 'localeText'}),
    defineField({
      name: 'heroImages',
      title: 'Hero Background Image(s) (optional)',
      description: 'Overrides the default truck photo used behind the homepage hero. Add one for a static photo, or several for an auto-advancing slider. Leave empty to keep the default.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'heroSlideDuration',
      title: 'Seconds Between Slides',
      description: 'Only used when there are 2+ Hero Background Images.',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(60),
      hidden: ({parent}) => ((parent as {heroImages?: unknown[]})?.heroImages?.length ?? 0) < 2,
    }),

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
