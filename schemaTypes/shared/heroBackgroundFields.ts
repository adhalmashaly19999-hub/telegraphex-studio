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
      name: 'heroImage',
      title: 'Hero Background Image (optional)',
      description: 'If set, this image is used as the hero section background instead of the color below.',
      type: 'image',
      options: {hotspot: true},
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
