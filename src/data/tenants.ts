// src/data/tenants.ts

export interface TenantConfig {
  id: string;
  name: string;
  whatsapp: string;
  primaryColor: string;
  logo: string;       
  description: string;
}

export const tenants: Record<string, TenantConfig> = {
  // Cliente 1: local
  "localhost:3000": {
    id: "hamburgueseria_lucas",
    name: "Lucas Burgers",
    whatsapp: "549351000000",
    primaryColor: "#FF8C00",
    logo: "/logos/lucas-burgers.png",
    description: "Las mejores hamburguesas de Córdoba"
  },
  // Cliente 2
  "pedidos.pizzeriadejuan.com": {
    id: "pizzeria_juan",
    name: "Pizzería Don Juan",
    whatsapp: "549351111111",
    primaryColor: "#E81A1A",
    logo: "/logos/pizzeria-juan.png",
    description: "Pizzas a la piedra 100% artesanales"
  },
  // Cliente 3
  "lomitos-pro.vercel.app": {
    id: "lomitos_pro",
    name: "Lomitos Pro XXL",
    whatsapp: "549351222222",
    primaryColor: "#2D5A27",
    logo: "/logos/lomitos-pro.png",
    description: "El verdadero lomito cordobés"
  }
};

// Cliente por defecto si el dominio no coincide
export const defaultTenant: TenantConfig = tenants["localhost:3000"];