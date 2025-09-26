import { defineField, defineType } from 'sanity';
import { GraduationCapIcon } from 'lucide-react';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: GraduationCapIcon,
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree/Program',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'institution',
      title: 'Institution Name',
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
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if currently studying',
    }),
    defineField({
      name: 'current',
      title: 'Currently Studying',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'On Hold', value: 'on-hold' },
          { title: 'Dropped Out', value: 'dropped' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gpa',
      title: 'GPA/Grade',
      type: 'string',
      description: 'GPA, percentage, or grade achieved',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(300),
      description: 'Additional details, courses, projects, etc.',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(5),
      description: 'Notable achievements, awards, honors (max 5)',
    }),
    defineField({
      name: 'relevantCourses',
      title: 'Relevant Courses',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(10),
      description: 'Key courses related to your field (max 10)',
    }),
    defineField({
      name: 'logo',
      title: 'Institution Logo',
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
      title: 'degree',
      subtitle: 'institution',
      media: 'logo',
      startDate: 'startDate',
      endDate: 'endDate',
      current: 'current',
    },
    prepare({ title, subtitle, media, startDate, endDate, current }) {
      const startYear = startDate ? new Date(startDate).getFullYear() : '';
      const endYear = current ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '');
      const yearRange = startYear ? `${startYear} - ${endYear}` : '';
      
      return {
        title,
        subtitle: `${subtitle} ${yearRange ? `(${yearRange})` : ''}`,
        media,
      };
    },
  },
});