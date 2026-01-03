import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main headline text (e.g., "Create Beautiful Websites.")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle text below the main title',
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'orientation',
              title: 'Orientation',
              type: 'string',
              options: {
                list: [
                  {title: 'Portrait', value: 'portrait'},
                  {title: 'Landscape', value: 'landscape'},
                ],
              },
              initialValue: 'landscape',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              media: 'image',
              orientation: 'orientation',
            },
            prepare({media, orientation}) {
              return {
                title: orientation === 'portrait' ? 'Portrait' : 'Landscape',
                media,
              }
            },
          },
        },
      ],
      description: 'Gallery of images that will overflow the edges',
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Button Label',
              description: 'Text displayed on the button',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              type: 'string',
              title: 'Link URL',
              description: 'URL the button links to (e.g., /contact, /portfolio, https://example.com)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isExternal',
              type: 'boolean',
              title: 'External Link',
              description: 'Check if this is an external link (opens in new tab)',
              initialValue: false,
            },
            {
              name: 'variant',
              type: 'string',
              title: 'Button Variant',
              options: {
                list: [
                  {title: 'Primary (Black)', value: 'primary'},
                  {title: 'Secondary (White)', value: 'secondary'},
                  {title: 'Outline (Transparent)', value: 'outline'},
                ],
              },
              initialValue: 'primary',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'link',
            },
          },
        },
      ],
      description: 'Call-to-action buttons displayed below the text',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this hero section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'imageGallery.0',
    },
  },
})


