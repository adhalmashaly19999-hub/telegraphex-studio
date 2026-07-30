import {defineType, defineField} from 'sanity'
import {requireBothLanguages} from '../validators/requireBothLanguages'

export default defineType({
  name: 'companyInfo',
  title: 'Company Contact Info',
  type: 'document',
  description: 'Shared contact details shown in the footer, the Contact page, and structured data. Editing here updates everywhere at once.',
  fields: [
    defineField({
      name: 'phone',
      title: 'Sales Phone (for tel: links)',
      description: 'International format, e.g. +201110064636. This is the site\'s primary "call us" number (nav bar, footer, structured data) — it also happens to be the sales line.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Sales Phone (display format)',
      description: 'e.g. +20 111 006 4636',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'supportPhone', title: 'Support Phone (for tel: links)', type: 'string'}),
    defineField({name: 'supportPhoneDisplay', title: 'Support Phone (display format)', type: 'string'}),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description: 'Digits only, no leading + or 00, e.g. 201110064636',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Support Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'localeString',
      validation: requireBothLanguages('addresses'),
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'localeString',
      validation: requireBothLanguages('business hours'),
    }),
    defineField({name: 'taxId', title: 'Tax ID', type: 'string'}),
  ],
  preview: {
    prepare: () => ({title: 'Company Contact Info'}),
  },
})
