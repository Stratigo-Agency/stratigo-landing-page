import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Blog post title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary of the blog post (shown in listings)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the blog post',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author name',
      initialValue: 'Stratigo Team',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When the post was published',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Blog post category',
      options: {
        list: [
          {title: 'Web Design', value: 'web-design'},
          {title: 'Development', value: 'development'},
          {title: 'SEO', value: 'seo'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Business', value: 'business'},
          {title: 'Tips & Tricks', value: 'tips-tricks'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for the blog post',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Main blog post content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          name: 'table',
          title: 'Table',
          type: 'object',
          fields: [
            {
              name: 'rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      of: [{type: 'string'}],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              rows: 'rows',
            },
            prepare({rows}) {
              return {
                title: 'Table',
                subtitle: rows ? `${rows.length} rows` : 'Empty table',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      initialValue: 5,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post as featured on the blog listing',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this post',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'featuredImage',
      category: 'category',
      isActive: 'isActive',
    },
    prepare({title, subtitle, media, category, isActive}) {
      return {
        title: title || 'Untitled Post',
        subtitle: isActive
          ? `${category || 'Uncategorized'} • ${subtitle?.substring(0, 50)}...`
          : `(Inactive) ${category || 'Uncategorized'}`,
        media,
      }
    },
  },
})

