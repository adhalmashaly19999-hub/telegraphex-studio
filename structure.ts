import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = new Set(['homePage', 'aboutPage', 'seoSettings'])

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
        .title('SEO Settings')
        .id('seoSettings')
        .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string)
      ),
    ])
