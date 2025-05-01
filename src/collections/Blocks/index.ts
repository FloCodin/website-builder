import type { CollectionConfig } from 'payload'
import type { AccessArgs } from 'payload'

export const Blocks: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type'],
  },
  access: {
    read: async ({ req }: AccessArgs) => {
      const user = req.user as { role: string; subscription?: string } | undefined;

      if (!user) return false;

      // SuperUser oder Admin sehen alles
      if (['superuser', 'admin'].includes(user.role)) return true;

      // Editor → nur erlaubte Blocks aus Subscription
      if (user.role === 'editor' && typeof user.subscription === 'string') {
        const subscription = await req.payload.findByID({
          collection: 'subscriptions',
          id: user.subscription,
        });

        const allowedBlockIDs = (subscription as any)?.allowedBlocks || [];

        return {
          id: {
            in: allowedBlockIDs,
          },
        };
      }

      return false;
    },

    create: ({ req }) => {
      const user = req.user as { role?: string } | undefined;
      return user?.role === 'superuser';
    },

    update: ({ req }) => {
      const user = req.user as { role?: string } | undefined;
      return ['superuser', 'admin'].includes(user?.role || '');
    },

    delete: ({ req }) => {
      const user = req.user as { role?: string } | undefined;
      return user?.role === 'superuser';
    },
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
        { label: 'TestImageSlider', value: 'testImageSlider' },
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
