import localeString from './objects/localeString'
import localeText from './objects/localeText'

import homePage from './documents/homePage'
import aboutPage from './documents/aboutPage'
import service from './documents/service'
import pricingTier from './documents/pricingTier'
import faqItem from './documents/faqItem'
import teamMember from './documents/teamMember'
import branch from './documents/branch'
import testimonial from './documents/testimonial'

export const schemaTypes = [
  // Reusable objects
  localeString,
  localeText,

  // Singletons
  homePage,
  aboutPage,

  // Collections
  service,
  pricingTier,
  faqItem,
  teamMember,
  branch,
  testimonial,
]
