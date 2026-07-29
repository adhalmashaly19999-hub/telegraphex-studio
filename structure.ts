import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = new Set([
  'homePage', 'aboutPage', 'seoSettings', 'companyInfo',
  'privacyPage', 'termsPage', 'getStartedPage', 'careersPage', 'servicesPage',
])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Services Page')
        .id('servicesPage')
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
      S.listItem()
        .title('Careers Page')
        .id('careersPage')
        .child(S.document().schemaType('careersPage').documentId('careersPage')),
      S.listItem()
        .title('Get Started Page')
        .id('getStartedPage')
        .child(S.document().schemaType('getStartedPage').documentId('getStartedPage')),
      S.listItem()
        .title('Privacy Policy Page')
        .id('privacyPage')
        .child(S.document().schemaType('privacyPage').documentId('privacyPage')),
      S.listItem()
        .title('Terms of Service Page')
        .id('termsPage')
        .child(S.document().schemaType('termsPage').documentId('termsPage')),
      S.listItem()
        .title('Company Contact Info')
        .id('companyInfo')
        .child(S.document().schemaType('companyInfo').documentId('companyInfo')),
      S.listItem()
        .title('SEO Settings')
        .id('seoSettings')
        .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string)
      ),
    ])
