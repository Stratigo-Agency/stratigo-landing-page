import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title (e.g., "Contact us")',
      initialValue: 'Contact us',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle text below the title',
      initialValue: 'Get in touch with us for any enquiries and questions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactCategories',
      title: 'Contact Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category Name',
              type: 'string',
              description: 'Category name (e.g., "general inquiries", "careers", "collaborations", "address")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
              description: 'Email address (optional)',
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'string',
              description: 'Phone number (optional)',
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Address lines (for address category)',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappLink',
      title: 'WhatsApp Link',
      type: 'string',
      description: 'WhatsApp link for the WhatsApp button (e.g., https://wa.me/6281234567890)',
      validation: (Rule) => Rule.uri({
        scheme: ['https'],
      }),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Behance', value: 'behance'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Telegram', value: 'telegram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Facebook', value: 'facebook'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required().uri({
                scheme: ['https'],
              }),
            }),
          ],
        },
      ],
    }),
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
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this contact section',
      initialValue: true,
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
        title: title || 'Contact Information',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : '',
        media,
      }
    },
  },
})

