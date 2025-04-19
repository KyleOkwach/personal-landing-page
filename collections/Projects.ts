import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'title',
        type: 'text',
        required: true,
    },
    {
        name: 'summary',
        type: 'textarea',
        required: true,
    },
    {
        name: 'thumbnail',
        type: 'upload',
        relationTo: 'media',
        required: false,
    }
  ],
  upload: true,
}
