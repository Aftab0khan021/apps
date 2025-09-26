import { defineField, defineType } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';

export const experience = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  icon: BriefcaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Internship', value: 'internship' },
          { title: 'Contract', value: 'contract' },
          { title: 'Freelance', value: 'freelance' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if currently working here',
    }),
    defineField({
      name: 'current',
      title: 'Currently Working Here',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.max(5),
      description: 'Key responsibilities and achievements (max 5 points)',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(10),
      description: 'Maximum 10 technologies',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
        aspect: [1, 1], // 1:1 aspect ratio
      },
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
      title: 'Featured Experience',
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
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'company',
      media: 'logo',
      startDate: 'startDate',
      current: 'current',
    },
    prepare({ title, subtitle, media, startDate, current }) {
      return {
        title,
        subtitle: `${subtitle} ${current ? '(Current)' : ''}`,
        media,
      };
    },
  },
});