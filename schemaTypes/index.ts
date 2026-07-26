import localeString from './objects/localeString'
import localeText from './objects/localeText'
import localeBlockContent from './objects/localeBlockContent'
import landingHero from './objects/landingBlocks/landingHero'
import landingRichText from './objects/landingBlocks/landingRichText'
import landingImageText from './objects/landingBlocks/landingImageText'
import landingFeatureGrid from './objects/landingBlocks/landingFeatureGrid'
import landingCta from './objects/landingBlocks/landingCta'
import landingFormEmbed from './objects/landingBlocks/landingFormEmbed'

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
import landingPage from './documents/landingPage'

export const schemaTypes = [
  // Reusable objects
  localeString,
  localeText,
  localeBlockContent,

  // Landing page section blocks
  landingHero,
  landingRichText,
  landingImageText,
  landingFeatureGrid,
  landingCta,
  landingFormEmbed,

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
  landingPage,
]
