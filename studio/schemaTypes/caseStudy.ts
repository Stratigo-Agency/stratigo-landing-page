import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the client or company',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Text',
      type: 'string',
      description: 'Bold/highlighted text in the description (e.g., "+3,660% increase in SEO visibility")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Additional description text after the highlight',
    }),
    defineField({
      name: 'image',
      title: 'Case Study Image',
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
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color for the card (e.g., #0066CC, #F97316)',
      options: {
        list: [
          {title: 'Blue', value: '#0066CC'},
          {title: 'Light Gray', value: '#F5F5F5'},
          {title: 'Green', value: '#22C55E'},
          {title: 'Orange', value: '#F97316'},
          {title: 'Purple', value: '#8B5CF6'},
          {title: 'Black', value: '#000000'},
          {title: 'White', value: '#FFFFFF'},
        ],
      },
      initialValue: '#0066CC',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this case study as a large featured item',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link to view the full case study',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this case study',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
      isFeatured: 'isFeatured',
    },
    prepare({title, subtitle, media, isFeatured}) {
      return {
        title: isFeatured ? `⭐ ${title}` : title,
        subtitle,
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
  ],
})

