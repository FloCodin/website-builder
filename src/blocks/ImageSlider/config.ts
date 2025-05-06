import { Block } from "payload";

const ImageSlider: Block = {
  slug: 'imageSlider', // 👈 wichtig: camelCase
  labels: {
    singular: 'Image Slider',
    plural: 'Image Sliders',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      defaultValue: true,
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Loop',
      defaultValue: true,
    },
    {
      name: 'showControls',
      type: 'checkbox',
      label: 'Show Controls',
      defaultValue: true,
    },
    {
      name: 'showPagination',
      type: 'checkbox',
      label: 'Show Pagination Dots',
      defaultValue: true,
    },
    {
      name: 'caption',
      label: 'Bildtext / Beschreibung',
      type: 'text',
      required: false,
    },
  ],
};

export default ImageSlider;
