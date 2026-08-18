import {defineType, defineField} from 'sanity'

/**
 * One slide in a hero image (or slider). Desktop is required; mobile is a
 * separate crop for narrow/tall phone screens — leave it empty and the
 * frontend falls back to the desktop image there too.
 */
export default defineType({
  name: 'heroImageSlide',
  title: 'Hero Image',
  type: 'object',
  fields: [
    defineField({
      name: 'desktop',
      title: 'Desktop Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Image (optional)',
      description: 'A separate crop for phone screens (typically taller/narrower than the desktop image). Leave empty to reuse the desktop image on mobile too.',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {media: 'desktop', mobileMedia: 'mobile'},
    prepare: ({media, mobileMedia}) => ({
      title: 'Hero Image',
      subtitle: mobileMedia ? 'Desktop + mobile' : 'Desktop only',
      media,
    }),
  },
})
