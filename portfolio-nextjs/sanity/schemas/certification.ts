import { defineField, defineType } from 'sanity';
import { AwardIcon } from 'lucide-react';

export const certification = defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  icon: AwardIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Leave empty if certification does not expire',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
      description: 'Certification ID or credential number',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify the certification',
    }),
    defineField({
      name: 'image',
      title: 'Certificate Badge/Image',
      type: 'image',
      options: {
        hotspot: true,
        aspect: [1, 1], // 1:1 aspect ratio
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(300),
      description: 'Brief description of the certification',
    }),
    defineField({
      name: 'skills',
      title: 'Related Skills',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(10),
      description: 'Skills covered by this certification',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming', value: 'programming' },
          { title: 'Cloud Computing', value: 'cloud' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Cybersecurity', value: 'security' },
          { title: 'Project Management', value: 'project-management' },
          { title: 'Design', value: 'design' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Certification',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Issue Date, New',
      name: 'issueDateDesc',
      by: [{ field: 'issueDate', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'issueDate', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'issuer',
      media: 'image',
      issueDate: 'issueDate',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, issueDate, featured }) {
      const year = issueDate ? new Date(issueDate).getFullYear() : '';
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${subtitle} ${year ? `(${year})` : ''}`,
        media,
      };
    },
  },
});