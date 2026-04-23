export default {
  name: 'product',
  type: 'document',
  title: 'Productos',
  fields: [
    {
        name: 'category',
        type: 'string',
        title: 'Categoría',
        options: {
            list: [
                {title: 'Todo el menú', value: 'all'},
                {title: 'Hamburguesas', value: 'burgers'}, // El 'value' debe coincidir con el ID en tu data/menu.ts
                {title: 'Pizzas', value: 'pizzas'},
                {title: 'Acompañamientos', value: 'sides'},
                {title: 'Bebidas', value: 'drinks'},
                {title: 'Postres', value: 'desserts'},
            ],
        },
            validation: (Rule: any) => Rule.required(), // Obligatorio para que no se rompa el filtro
    },
    {
      name: 'name',
      type: 'string',
      title: 'Nombre de la hamburguesa'
    },
    {
      name: 'price',
      type: 'number',
      title: 'Precio'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Imagen del producto',
      options: { hotspot: true }
    },
    {
      name: 'stock',
      type: 'boolean',
      title: '¿Hay stock?',
      initialValue: true
    },
    {
        name: 'ingredients',
        type: 'array',
        title: 'Ingredientes y Adicionales',
        of: [
            {
            type: 'object',
            name: 'ingredient',
            fields: [
                { name: 'name', type: 'string', title: 'Nombre (ej: Cheddar)' },
                { name: 'price', type: 'number', title: 'Precio extra ($0 si ya viene en el producto)' },
                { 
                name: 'canBeRemoved', 
                type: 'boolean', 
                title: '¿Se puede quitar?', 
                description: 'Si está activo, el cliente verá la opción de "Sin este ingrediente"',
                initialValue: true 
                }
            ]
            }
        ]
    },
    {
      name: 'tenant',
      title: 'Cliente',
      type: 'reference',
      to: [{ type: 'tenant' }],
      validation: (Rule: any) => Rule.required()
    },
  ]
}