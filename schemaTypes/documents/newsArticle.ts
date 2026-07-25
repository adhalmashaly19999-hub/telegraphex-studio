import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {source: 'title.en', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover / Preview Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'excerpt', title: 'Preview Excerpt', type: 'localeText'}),
    defineField({name: 'body', title: 'Body', type: 'localeBlockContent'}),
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
  ],
  orderings: [
    {title: 'Newest First', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'publishedAt', media: 'coverImage'},
  },
})
