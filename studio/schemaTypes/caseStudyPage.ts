import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyPage',
  title: 'Case Study Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Case study title',
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
      description: 'Short summary of the case study (shown in listings)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the case study',
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the client or company',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Case study category',
      options: {
        list: [
          {title: 'Web Design', value: 'web-design'},
          {title: 'Web Development', value: 'web-development'},
          {title: 'E-commerce', value: 'ecommerce'},
          {title: 'Branding', value: 'branding'},
          {title: 'Digital Marketing', value: 'digital-marketing'},
          {title: 'SEO', value: 'seo'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for the case study',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Flexible content blocks for the case study',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
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
                    type: 'string',
                    title: 'URL',
                    description: 'Can be relative (e.g., /blog/post) or absolute (e.g., https://example.com)',
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
          name: 'video',
          title: 'Video',
          type: 'object',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or direct video URL',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'autoplay',
              type: 'boolean',
              title: 'Autoplay',
              description: 'Automatically play video when page loads',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              url: 'url',
              caption: 'caption',
            },
            prepare({url, caption}) {
              return {
                title: 'Video',
                subtitle: caption || url || 'No URL provided',
              }
            },
          },
        },
        {
          name: 'heading',
          title: 'Heading Block',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Heading Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'level',
              type: 'string',
              title: 'Heading Level',
              options: {
                list: [
                  {title: 'H1', value: 'h1'},
                  {title: 'H2', value: 'h2'},
                  {title: 'H3', value: 'h3'},
                  {title: 'H4', value: 'h4'},
                ],
              },
              initialValue: 'h2',
            },
          ],
          preview: {
            select: {
              text: 'text',
              level: 'level',
            },
            prepare({text, level}) {
              return {
                title: `${level?.toUpperCase() || 'H2'}: ${text || 'Untitled'}`,
              }
            },
          },
        },
        {
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Text Content',
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alignment',
              type: 'string',
              title: 'Text Alignment',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
              },
              initialValue: 'left',
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({text}) {
              return {
                title: 'Text Block',
                subtitle: text ? `${text.substring(0, 50)}...` : 'Empty text block',
              }
            },
          },
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
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When the case study was published',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Show this case study as featured on the listing page',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this case study',
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
        title: title || 'Untitled Case Study',
        subtitle: isActive
          ? `${category || 'Uncategorized'} • ${subtitle?.substring(0, 50)}...`
          : `(Inactive) ${category || 'Uncategorized'}`,
        media,
      }
    },
  },
})

