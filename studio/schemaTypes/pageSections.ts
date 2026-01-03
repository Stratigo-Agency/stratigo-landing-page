import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'caseStudiesTitle',
      title: 'Case Studies Section Title',
      type: 'string',
      description: 'Title for the case studies section (e.g., "Website yang Bekerja untuk-Mu")',
      validation: (Rule) => Rule.required(),
      initialValue: 'Website yang Bekerja untuk-Mu',
    }),
    defineField({
      name: 'deliverablesTitle',
      title: 'Deliverables Section Title',
      type: 'string',
      description: 'Title for the deliverables section (e.g., "Apa kelebihan website kami?")',
      validation: (Rule) => Rule.required(),
      initialValue: 'Apa kelebihan website kami?',
    }),
    defineField({
      name: 'createWithUsTitle',
      title: 'Create With Us Section Title',
      type: 'string',
      description: 'Title for the create with us section (e.g., "Ciptakan keperluan bisnis Anda")',
      validation: (Rule) => Rule.required(),
      initialValue: 'Ciptakan keperluan bisnis Anda',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide these section titles',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'caseStudiesTitle',
      subtitle: 'deliverablesTitle',
    },
    prepare({title, subtitle}) {
      return {
        title: 'Page Sections',
        subtitle: `${title} | ${subtitle}`,
      }
    },
  },
})

