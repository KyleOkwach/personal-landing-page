// src/collections/Messages.ts
import { CollectionConfig } from 'payload';

const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: 'Message',
    plural: 'Messages',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as read',
      },
    },
  ],
  timestamps: true,
};

export default Messages;