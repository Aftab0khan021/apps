import { defineField, defineType } from 'sanity';
import { UserIcon } from 'lucide-react';

export const personalInfo = defineType({
  name: 'personalInfo',
  title: 'Personal Information',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'summary',
      title: 'Professional Summary',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief description (max 200 characters)',
    }),
    defineField({
      name: 'avatar',
      title: 'Profile Photo',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
        aspect: [1, 1], // 1:1 aspect ratio as per PDF requirements
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'website',
      title: 'Personal Website',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'avatar',
    },
  },
});