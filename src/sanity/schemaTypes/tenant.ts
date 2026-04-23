// sanity/schemaTypes/tenant.ts
import { defineField, defineType } from 'sanity'

export const tenantType = defineType({
  name: 'tenant',
  title: 'Tenant (Cliente)',
  type: 'document',
  fields: [
    defineField({
      name: 'subdomain',
      title: 'Subdominio',
      type: 'slug',
      description: 'Ej: "pizzeria" para pizzeria.tuapp.com',
      options: { source: 'name' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Nombre del negocio',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato: 549351xxxxxxx (con código de país, sin +)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'primaryColor',
      title: 'Color primario',
      type: 'string',
      description: 'Ej: #FF8C00',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).warning('Usá formato hex: #RRGGBB')
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Color secundario',
      type: 'string',
      description: 'Ej: #1A1A1A',
    }),
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      initialValue: true
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'subdomain.current' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `subdominio: ${subtitle}` }
    }
  }
})