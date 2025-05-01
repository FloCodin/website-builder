import type { CollectionConfig } from 'payload'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'admin', 'allowedBlocks'],
  },
  access: {
    read: () => true, // optional: anpassen je nach Rolle
    create: ({ req }) => req.user?.role === 'superuser',
    update: ({ req }) => req.user?.role === 'superuser',
    delete: ({ req }) => req.user?.role === 'superuser',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'admin',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'allowedBlocks',
      type: 'relationship',
      relationTo: 'blocks',
      hasMany: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
