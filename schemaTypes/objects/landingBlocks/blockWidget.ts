import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blockWidget',
  title: 'Dynamic Widget',
  type: 'object',
  description:
    'Drops in a pre-built, self-updating piece of the site — e.g. the client testimonials carousel, or the branch list — wherever you place it. These pull their own content from elsewhere (Testimonials, Branches, Services, etc.), not from typed text here.',
  fields: [
    defineField({
      name: 'widgetType',
      title: 'Widget',
      type: 'string',
      options: {
        list: [
          {title: 'Client Testimonials Carousel', value: 'testimonials'},
          {title: 'Client Logos Marquee', value: 'clientLogos'},
          {title: 'Services Grid (all services)', value: 'serviceGrid'},
          {title: 'Branch List (full details + directions)', value: 'branchList'},
          {title: 'Office Locations (simple cards)', value: 'officeLocations'},
          {title: 'Delivery Times by Zone (table)', value: 'deliveryZonesTable'},
          {title: 'Company Contact Info (phone/email/address/hours)', value: 'contactInfo'},
          {title: 'FAQ Accordion List', value: 'faqList'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'heading', title: 'Heading (optional)', type: 'localeString'}),
    defineField({name: 'subheading', title: 'Subheading (optional)', type: 'localeText'}),
    defineField({
      name: 'linkLabel',
      title: '"See more" Link Label (optional)',
      type: 'localeString',
    }),
    defineField({
      name: 'linkHref',
      title: '"See more" Link (optional)',
      description: 'An internal path (e.g. /branches) or a full https:// URL.',
      type: 'string',
    }),
  ],
  preview: {
    select: {widgetType: 'widgetType', title: 'heading.en'},
    prepare: ({widgetType, title}) => ({title: `Widget: ${widgetType}`, subtitle: title}),
  },
})
