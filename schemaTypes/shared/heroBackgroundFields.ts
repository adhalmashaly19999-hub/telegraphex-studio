import {defineField} from 'sanity'

/**
 * Shared hero-background fields, spread into any page singleton that has a
 * hero section. Image takes priority; the color is only used as a fallback
 * when no image is set. Limited to black/red (both proven dark treatments
 * already used elsewhere on the site) because every hero's heading/body text
 * is hardcoded white — a light background option would need that text logic
 * reworked too, which is a bigger change than this field is meant to cover.
 */
export function heroBackgroundFields() {
  return [
    defineField({
      name: 'heroImages',
      title: 'Hero Background Image(s) (optional)',
      description: 'Add one for a static background, or several to turn this hero into an auto-advancing slider. Each has its own desktop + optional mobile crop. Used instead of the color below when set.',
      type: 'array',
      of: [{type: 'heroImageSlide'}],
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
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Color',
      description: 'Used only when no Hero Background Image is set above.',
      type: 'string',
      options: {list: ['black', 'red']},
      initialValue: 'black',
    }),
  ]
}
