import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

// Rollenliste als Konstante
const roles = [
  { label: 'SuperUser', value: 'superuser' },
  { label: 'Admin (Kunde)', value: 'admin' },
  { label: 'Editor', value: 'editor' },
]

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  timestamps: true,
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
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
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'role',
      type: 'select',
      options: roles,
      defaultValue: 'editor',
      required: true,
      access: {
        // Nur SuperUser darf Rollen setzen/ändern
        create: ({ req }) => req.user?.role === 'superuser',
        //update: ({ req }) => req.user?.role === 'superuser',
        update: () => true, // ⬅️ TEMPORÄR erlauben
      },
    },
    {
      name: 'subscription',
      type: 'relationship',
      relationTo: 'subscriptions',
      required: false,
      access: {
        // Optional: Auch Abo-Zuordnung nur durch SuperUser/Admin erlauben
        create: ({ req }) => req.user?.role !== 'editor',
        update: ({ req }) => req.user?.role !== 'editor',
      },
    },
  ],
}
