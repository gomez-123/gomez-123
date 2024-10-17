import {defineField, defineType} from 'sanity';
import {UsersIcon} from '@sanity/icons';

export default defineType({
  name: 'employee',
  title: 'Empleado',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombres y Apellidos',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'dni',
      title: 'DNI',
      type: 'string',
      validation: Rule => Rule.required().min(8).max(8),
      description: 'DNI del empleado, debe tener exactamente 8 dígitos.',
    }),
    defineField({
      name: 'position',
      title: 'Rol o cargo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Foto de perfil',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'dni',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: `${title}`,
        subtitle: `DNI: ${subtitle}`,
        media,
      };
    },
  },
});
