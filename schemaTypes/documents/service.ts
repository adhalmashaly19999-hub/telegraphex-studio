import {defineType, defineField} from 'sanity'
import {heroBackgroundFields} from '../shared/heroBackgroundFields'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
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
          'Truck', 'Warehouse', 'Banknote', 'Repeat', 'PackageCheck',
          'ShieldCheck', 'Timer', 'Boxes', 'Headset',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Accent color',
      type: 'string',
      options: {list: ['red', 'black', 'white']},
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
      name: 'slug',
      title: 'Anchor Slug',
      description: 'Used for nav links that jump straight to this service on the Services page, e.g. /services#domestic-shipping',
      type: 'slug',
      options: {source: 'title.en', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Short Description',
      type: 'localeText',
      validation: (Rule) =>
        Rule.custom((value: {en?: string; ar?: string} | undefined) => {
          if (!value?.en || !value?.ar) return 'Both English and Arabic descriptions are required.';
          return true;
        }),
    }),
    defineField({
      name: 'features',
      title: 'Feature Bullets',
      type: 'array',
      of: [{type: 'localeString'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on homepage preview',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),

    // --- Detail page content (shown at /services/<slug>) ---
    ...heroBackgroundFields(),
    defineField({
      name: 'body',
      title: 'Detail Page Content',
      description: 'Longer write-up shown on this service\'s own page. Leave empty and the page will just show the short description and feature bullets above.',
      type: 'localeBlockContent',
    }),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'color'},
  },
})
