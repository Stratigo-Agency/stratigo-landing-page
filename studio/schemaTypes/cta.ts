import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call To Action',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short, catchy tagline (e.g., "Ready to get started?")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Detailed description text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on the button',
      initialValue: 'Hubungi Kami via WhatsApp',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappLink',
      title: 'WhatsApp Link',
      type: 'string',
      description: 'WhatsApp link (e.g., https://wa.me/6281234567890 or https://api.whatsapp.com/send?phone=6281234567890)',
      validation: (Rule) => Rule.required().uri({
        scheme: ['https'],
      }),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
      description: 'Toggle to show/hide this CTA section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
      subtitle: 'description',
      media: 'backgroundImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'CTA Section',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : '',
        media,
      }
    },
  },
})



