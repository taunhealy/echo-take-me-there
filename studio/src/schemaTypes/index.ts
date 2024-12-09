import person from './documents/person'
import page from './documents/page'
import post from './documents/post'
import callToAction from './objects/callToAction'
import infoSection from './objects/infoSection'
import settings from './singletons/settings'
import link from './objects/link'
import blockContent from './objects/blockContent'
import hero from './objects/hero'
import recentPosts from './objects/recentPosts'
import service from './documents/service'
import servicesHero from './objects/servicesHero'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  service,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  hero,
  recentPosts,
  servicesHero,
]
