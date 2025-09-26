import { defineField, defineType } from 'sanity';
import { StarIcon } from 'lucide-react';

export const skill = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      description: 'Skill level from 0-100',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming Languages', value: 'programming' },
          { title: 'Frontend Development', value: 'frontend' },
          { title: 'Backend Development', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps & Tools', value: 'devops' },
          { title: 'Mobile Development', value: 'mobile' },
          { title: 'Data Science & AI', value: 'data-science' },
          { title: 'Design', value: 'design' },
          { title: 'Soft Skills', value: 'soft-skills' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Skill Icon',
      type: 'image',
      options: {
        hotspot: true,
        aspect: [1, 1],
      },
      description: 'Optional icon for the skill',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      description: 'Hex color code for skill badge (optional)',
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first within category',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Skill',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight in main skills section',
    }),
  ],
  orderings: [
    {
      title: 'By Category & Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'By Level (High to Low)',
      name: 'levelDesc',
      by: [{ field: 'level', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'level', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      level: 'level',
      featured: 'featured',
      media: 'icon',
    },
    prepare({ title, subtitle, level, featured, media }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${subtitle} - Level: ${level}%`,
        media,
      };
    },
  },
});