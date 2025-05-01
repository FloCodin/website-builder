import { GlobalConfig } from 'payload/types'


const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Theme Colors',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'primaryClass',
      label: 'Primäre Farbe',
      type: 'text',
      required: true,
      defaultValue: 'bg-indigo-600 text-white',
      options: [
        { label: 'Schwarz', value: 'bg-black text-white' },
        { label: 'Weiß', value: 'bg-white text-black' },
        { label: 'Rot', value: 'bg-red-500 text-white' },
        { label: 'Grün', value: 'bg-green-500 text-white' },
        { label: 'Blau', value: 'bg-blue-600 text-white' },
        { label: 'Cyan', value: 'bg-cyan-500 text-white' },
        { label: 'Indigo', value: 'bg-indigo-600 text-white' },
        { label: 'Orange', value: 'bg-orange-500 text-white' },
        { label: 'Gelb', value: 'bg-yellow-400 text-black' },
        { label: 'Emerald', value: 'bg-emerald-400 text-black' },
      ],
    },
    {
      name: 'secondaryClass',
      label: 'Sekundäre Farbe',
      type: 'text',
      required: false,
      options: [
        { label: 'Schwarz', value: 'bg-black text-white' },
        { label: 'Weiß', value: 'bg-white text-black' },
        { label: 'Rot', value: 'bg-red-500 text-white' },
        { label: 'Grün', value: 'bg-green-500 text-white' },
        { label: 'Blau', value: 'bg-blue-600 text-white' },
        { label: 'Cyan', value: 'bg-cyan-500 text-white' },
        { label: 'Indigo', value: 'bg-indigo-600 text-white' },
        { label: 'Orange', value: 'bg-orange-500 text-white' },
        { label: 'Gelb', value: 'bg-yellow-400 text-black' },
        { label: 'Emerald', value: 'bg-emerald-400 text-black' },
      ],
    },
    {
      name: 'tertiaryClass',
      label: 'Tertiäre Farbe',
      type: 'text',
      required: false,
      options: [
        { label: 'Schwarz', value: 'bg-black text-white' },
        { label: 'Weiß', value: 'bg-white text-black' },
        { label: 'Rot', value: 'bg-red-500 text-white' },
        { label: 'Grün', value: 'bg-green-500 text-white' },
        { label: 'Blau', value: 'bg-blue-600 text-white' },
        { label: 'Cyan', value: 'bg-cyan-500 text-white' },
        { label: 'Indigo', value: 'bg-indigo-600 text-white' },
        { label: 'Orange', value: 'bg-orange-500 text-white' },
        { label: 'Gelb', value: 'bg-yellow-400 text-black' },
        { label: 'Emerald', value: 'bg-emerald-400 text-black' },
      ],
    },
  ],
}

export default Theme
