import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingPackage',
  title: 'Pricing Package',
  type: 'document',
  fields: [
    defineField({
      name: 'packageName',
      title: 'Package Name',
      type: 'string',
      description: 'Name of the pricing package (e.g., "Starter", "Professional", "Enterprise")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional image for the package',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price display (e.g., "Rp 5.000.000", "$99/month", "Custom")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              type: 'string',
              title: 'Feature Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Feature Description',
              rows: 2,
              description: 'Optional description explaining the feature in more detail',
            },
          ],
          preview: {
            select: {
              title: 'feature',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'List of features included in this package',
      validation: (Rule) => Rule.min(1).error('At least one feature is required'),
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular Package',
      type: 'boolean',
      description: 'Mark this package as popular/recommended',
      initialValue: false,
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Button Label',
          description: 'Text displayed on the button (e.g., "Get Started", "Contact Us")',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          type: 'string',
          title: 'Link URL',
          description: 'URL the button links to (e.g., #kontak, /contact, https://wa.me/...)',
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: 'label',
          subtitle: 'link',
        },
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this package appears (lower number first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this package',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'packageName',
      subtitle: 'price',
      media: 'image',
      popular: 'isPopular',
    },
    prepare({title, subtitle, media, popular}) {
      return {
        title: popular ? `⭐ ${title}` : title,
        subtitle: subtitle || 'No price set',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Popular First',
      name: 'popularFirst',
      by: [{field: 'isPopular', direction: 'desc'}],
    },
  ],
})

