import type {Rule} from 'sanity'

/** Reusable validator for localeString/localeText fields: blocks publishing
 * until both English and Arabic are filled in, so a half-translated section
 * never reaches the live site. */
export function requireBothLanguages(fieldLabel: string) {
  return (rule: Rule) =>
    rule.custom((value: {en?: string; ar?: string} | undefined) => {
      if (!value?.en || !value?.ar) return `Both English and Arabic ${fieldLabel} are required.`
      return true
    })
}
