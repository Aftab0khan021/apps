import { defineField, defineType } from 'sanity';
import { MessageSquareIcon } from 'lucide-react';

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Messages',
  type: 'document',
  icon: MessageSquareIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().max(2000),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Optional phone number',
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
      description: 'Optional company name',
    }),
    defineField({
      name: 'isRead',
      title: 'Read Status',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isReplied',
      title: 'Reply Status',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Normal', value: 'normal' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(5),
      description: 'Optional tags for categorizing messages',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes for follow-up',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact-form' },
          { title: 'Email', value: 'email' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'contact-form',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Unread First',
      name: 'unreadFirst',
      by: [
        { field: 'isRead', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Priority & Date',
      name: 'priorityDate',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      email: 'email',
      isRead: 'isRead',
      priority: 'priority',
      createdAt: '_createdAt',
    },
    prepare({ title, subtitle, email, isRead, priority, createdAt }) {
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : '';
      const statusIcon = isRead ? '✓' : '●';
      const priorityIcon = priority === 'high' ? '🔥' : priority === 'urgent' ? '🚨' : '';
      
      return {
        title: `${statusIcon} ${priorityIcon} ${title}`,
        subtitle: `${subtitle} (${email}) - ${date}`,
      };
    },
  },
});