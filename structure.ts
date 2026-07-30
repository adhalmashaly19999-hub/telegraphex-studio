import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = new Set(['homePage', 'trackPage', 'companyInfo', 'seoSettings', 'sitePage'])

// One S.listItem() per flexible sitePage document — same "sections" schema
// underneath, just a fixed pageKey/documentId per page.
const SITE_PAGES: {id: string; title: string}[] = [
  {id: 'sitePage-about', title: 'About Page'},
  {id: 'sitePage-services', title: 'Services Page'},
  {id: 'sitePage-careers', title: 'Careers Page'},
  {id: 'sitePage-getStarted', title: 'Get Started Page'},
  {id: 'sitePage-contact', title: 'Contact Page'},
  {id: 'sitePage-branches', title: 'Branches Page'},
  {id: 'sitePage-coverage', title: 'Coverage Page'},
  {id: 'sitePage-faq', title: 'FAQ Page'},
  {id: 'sitePage-privacy', title: 'Privacy Policy Page'},
  {id: 'sitePage-terms', title: 'Terms of Service Page'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      ...SITE_PAGES.map(({id, title}) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType('sitePage').documentId(id))
      ),
      S.listItem()
        .title('Track Page')
        .id('trackPage')
        .child(S.document().schemaType('trackPage').documentId('trackPage')),
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
