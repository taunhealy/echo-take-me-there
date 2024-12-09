import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'servicesHero',
  title: 'Services Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
  ],
}); 