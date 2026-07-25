import localeString from './objects/localeString'
import localeText from './objects/localeText'
import localeBlockContent from './objects/localeBlockContent'

import homePage from './documents/homePage'
import aboutPage from './documents/aboutPage'
import service from './documents/service'
import faqItem from './documents/faqItem'
import teamMember from './documents/teamMember'
import branch from './documents/branch'
import testimonial from './documents/testimonial'
import newsArticle from './documents/newsArticle'
import seoSettings from './documents/seoSettings'
import clientLogo from './documents/clientLogo'
import deliveryZone from './documents/deliveryZone'

export const schemaTypes = [
  // Reusable objects
  localeString,
  localeText,
  localeBlockContent,

  // Singletons
  homePage,
  aboutPage,
  seoSettings,

  // Collections
  service,
  faqItem,
  teamMember,
  branch,
  testimonial,
  newsArticle,
  clientLogo,
  deliveryZone,
]
