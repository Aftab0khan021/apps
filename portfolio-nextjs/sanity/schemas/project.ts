import { defineField, defineType } from 'sanity';
import { CodeIcon } from 'lucide-react';

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief description (max 200 characters)',
    }),
    defineField({
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.max(5),
      description: 'Detailed project description (max 5 paragraphs)',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
        aspect: [16, 9], // 16:9 aspect ratio as per PDF requirements
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(6),
      description: 'Additional project images (max 6 images)',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(10),
      description: 'Technologies and tools used (max 10)',
    }),
    defineField({
      name: 'tags',
      title: 'Project Tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(5),
      description: 'Project categories/tags (max 5)',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository',
      type: 'url',
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Application', value: 'web-app' },
          { title: 'Mobile App', value: 'mobile-app' },
          { title: 'API/Backend', value: 'api' },
          { title: 'Library/Package', value: 'library' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'AI/ML', value: 'ai-ml' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Display in featured projects section',
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
    defineField({
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Planning', value: 'planning' },
          { title: 'On Hold', value: 'on-hold' },
        ],
      },
      initialValue: 'completed',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Completion Date, New',
      name: 'completedDateDesc',
      by: [{ field: 'completedDate', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      featured: 'featured',
      status: 'status',
    },
    prepare({ title, subtitle, media, featured, status }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${status} - ${subtitle}`,
        media,
      };
    },
  },
});