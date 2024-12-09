import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recentPosts',
  title: 'Recent Posts',
  type: 'object',
  fields: [
    defineField({
      name: 'numberOfPosts',
      title: 'Number of Recent Posts',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
})
