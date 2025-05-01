import type { CollectionConfig } from 'payload'

export const Blocks: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'superuser',
    update: ({ req }) => req.user?.role ? ['superuser', 'admin'].includes(req.user.role) : false,
    delete: ({ req }) => req.user?.role === 'superuser',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Call To Action', value: 'cta' },
        { label: 'Test Call to Action', value: 'testCallToAction' },
        { label: 'Banner', value: 'banner' },
        { label: 'ImageSlider', value: 'imageSlider' },
        { label: 'TestImageSlider', value: 'TestimageSlider' },
        { label: 'Formular', value: 'form' },
        { label: 'Content', value: 'content' },
        { label: 'Test Content', value: 'testContent' },
        { label: 'MediaBlock', value: 'media' },
        { label: 'Code', value: 'code' },
      ],

      required: true,
    },
    {
      name: 'freigegeben',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
