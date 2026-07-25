import {defineType, defineField} from 'sanity'

const blockContent = {
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{name: 'href', type: 'url', title: 'URL'}],
          },
        ],
      },
    },
    {
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'caption', type: 'string', title: 'Caption'}],
    },
  ],
}

export default defineType({
  name: 'localeBlockContent',
  title: 'Rich Content (EN/AR)',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', ...blockContent}),
    defineField({name: 'ar', title: 'Arabic', ...blockContent}),
  ],
})
