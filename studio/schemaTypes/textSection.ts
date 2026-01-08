import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textSection',
  title: 'Second Banner Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the text section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryTags',
      title: 'Category Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Optional tags to categorize the section (e.g., "Web Design", "Development")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Main text content for the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      description: 'Optional image cards to display below the text content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Card Subtitle',
              type: 'string',
              description: 'Optional subtitle or client name',
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
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
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'object',
              description: 'Optional call-to-action link for the card',
              fields: [
                {
                  name: 'label',
                  title: 'Link Label',
                  type: 'string',
                  description: 'Text for the CTA link (e.g., "Learn More", "View Project")',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  description: 'Link destination - can be relative (e.g., /blog/my-post) or absolute (e.g., https://example.com)',
                },
                {
                  name: 'isExternal',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  description: 'Open link in a new tab/window',
                  initialValue: true,
                },
              ],
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Display order (lower numbers appear first)',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Untitled Card',
                subtitle: subtitle || '',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique identifier for this text section',
      options: {
        source: 'sectionTitle',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'description',
      isActive: 'isActive',
    },
    prepare({title, subtitle, isActive}) {
      return {
        title: title || 'Untitled Text Section',
        subtitle: isActive 
          ? subtitle?.substring(0, 60) + (subtitle?.length > 60 ? '...' : '') 
          : '(Inactive) ' + subtitle?.substring(0, 50),
      }
    },
  },
})

