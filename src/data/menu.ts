export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  accent: string;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "Todo el menú",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    accent: "#FF5722",
  },
  {
    id: "burgers",
    name: "Hamburguesas",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    accent: "#FF8C00",
  },
  {
    id: "pizzas",
    name: "Pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
    accent: "#E53935",
  },
  // {
  //   id: "hot-dogs",
  //   name: "Hot Dogs",
  //   image: "https://images.unsplash.com/photo-1612392062631-94b4f66b24e4?w=600&h=400&fit=crop",
  //   accent: "#F4511E",
  // },
  {
    id: "sides",
    name: "Acompañamientos",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop",
    accent: "#FFB300",
  },
  {
    id: "drinks",
    name: "Bebidas",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=400&fit=crop",
    accent: "#0288D1",
  },
  {
    id: "desserts",
    name: "Postres",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
    accent: "#8E24AA",
  },
];

export const products: Product[] = [
  // Hamburguesas
  {
    id: "b1",
    name: "Clásica Smash",
    description: "Doble medallón aplastado, queso cheddar fundido, lechuga, tomate, pickles y nuestra salsa secreta",
    price: 1850,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "burgers",
    popular: true,
  },
  {
    id: "b2",
    name: "BBQ Bacon Tower",
    description: "Triple medallón, bacon crocante, aros de cebolla, queso suizo, salsa BBQ ahumada",
    price: 2350,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    category: "burgers",
    popular: true,
  },
  {
    id: "b3",
    name: "Crispy Chicken",
    description: "Pollo rebozado crocante, coleslaw casera, pepinos encurtidos, mayonesa de miel y mostaza",
    price: 1650,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    category: "burgers",
  },
  {
    id: "b4",
    name: "Mushroom Swiss",
    description: "Medallón angus, champiñones salteados con ajo, queso suizo derretido, aioli de trufa",
    price: 2100,
    image: "https://girlheartfood.com/wp-content/uploads/2023/11/Mushroom-Swiss-Burger-Feature.jpg",
    category: "burgers",
  },
  // Pizzas
  {
    id: "p1",
    name: "Margherita Clasica",
    description: "Salsa de tomate San Marzano, mozzarella fresca, albahaca, aceite de oliva extra virgen",
    price: 1600,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    category: "pizzas",
    popular: true,
  },
  {
    id: "p2",
    name: "Pepperoni Lover",
    description: "Doble capa de pepperoni importado, mozzarella extra, borde relleno de queso",
    price: 1950,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    category: "pizzas",
    popular: true,
  },
  {
    id: "p3",
    name: "Fugazzeta Rellena",
    description: "Cebolla caramelizada, mozzarella entre dos masas, aceitunas verdes, orégano",
    price: 1750,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    category: "pizzas",
  },
  {
    id: "p4",
    name: "4 Quesos",
    description: "Mozzarella, provolone, gorgonzola, parmesano reggiano, miel de trufa",
    price: 2050,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "pizzas",
  },
  // Hot Dogs
  // {
  //   id: "h1",
  //   name: "Chicago Style",
  //   description: "Salchicha premium en pan brioche, mostaza amarilla, cebolla, pickles, tomate, sport pepper",
  //   price: 1200,
  //   image: "https://images.unsplash.com/photo-1612392062631-94b4f66b24e4?w=400&h=300&fit=crop",
  //   category: "hot-dogs",
  //   popular: true,
  // },
  // {
  //   id: "h2",
  //   name: "Chili Cheese Dog",
  //   description: "Salchicha jumbo, chili de carne casero, queso cheddar fundido, jalapeños",
  //   price: 1450,
  //   image: "https://images.unsplash.com/photo-1583835746434-cf1534674f41?w=400&h=300&fit=crop",
  //   category: "hot-dogs",
  // },
  // {
  //   id: "h3",
  //   name: "Bacon Wrapped",
  //   description: "Salchicha envuelta en bacon crocante, guacamole, salsa criolla, jalapeños frescos",
  //   price: 1550,
  //   image: "https://images.unsplash.com/photo-1619740455993-9d622702b6c5?w=400&h=300&fit=crop",
  //   category: "hot-dogs",
  // },
  // Acompañamientos
  {
    id: "s1",
    name: "Papas Fritas Gourmet",
    description: "Papas rústicas con cáscara, sal de mar, romero, aderezo chipotle",
    price: 750,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    category: "sides",
    popular: true,
  },
  {
    id: "s2",
    name: "Aros de Cebolla",
    description: "Rebozados en tempura crocante, salsa ranch casera",
    price: 850,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop",
    category: "sides",
  },
  {
    id: "s3",
    name: "Nuggets x10",
    description: "Pollo 100% pechuga, rebozado crocante, salsas a elección",
    price: 1100,
    image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&h=300&fit=crop",
    category: "sides",
  },
  // Bebidas
  {
    id: "d1",
    name: "Coca-Cola 500ml",
    description: "Bien fría",
    price: 500,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
    category: "drinks",
  },
  {
    id: "d2",
    name: "Limonada Natural",
    description: "Exprimida al momento, con menta y azúcar mascabo",
    price: 650,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
    category: "drinks",
    popular: true,
  },
  {
    id: "d3",
    name: "Milkshake",
    description: "Chocolate, frutilla o vainilla. Cremoso y espeso",
    price: 900,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
    category: "drinks",
  },
  {
    id: "d4",
    name: "Agua Mineral 500ml",
    description: "Con o sin gas",
    price: 350,
    image: "https://acdn-us.mitiendanube.com/stores/001/147/879/products/63-53cbd6b7445c8ed73517381900561482-1024-1024.webp",
    category: "drinks",
  },
  // Postres
  {
    id: "ds1",
    name: "Brownie con Helado",
    description: "Brownie tibio de chocolate semi amargo, bola de helado de crema americana, salsa de chocolate",
    price: 900,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    category: "desserts",
    popular: true,
  },
  {
    id: "ds2",
    name: "Cheesecake del día",
    description: "Preguntar sabor disponible. Masa de galletitas, relleno cremoso, coulis de frutos rojos",
    price: 850,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    category: "desserts",
  },
];
