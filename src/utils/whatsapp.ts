import { CartItem, DeliveryMethod } from "@/context/CartContext";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildWhatsAppMessage(
  items: CartItem[],
  totalPrice: number,
  deliveryMethod: DeliveryMethod,
  address: string,
  customerName: string,
  customerPhone: string,
  notes: string,
  paymentMethod: string | null
): string {
  const lines: string[] = [];

  lines.push("🍔 *NUEVO PEDIDO*");
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("");

  if (customerName) {
    lines.push(`👤 *Cliente:* ${customerName}`);
  }
  if (customerPhone) {
    lines.push(`📱 *Teléfono:* ${customerPhone}`);
  }

  lines.push("");
  lines.push("📋 *DETALLE DEL PEDIDO:*");
  lines.push("──────────────────────");

  items.forEach((item) => {
    lines.push(`• ${item.quantity}x ${item.product.name}`);
    lines.push(`   ${formatPrice(item.product.price * item.quantity)}`);
  });

  lines.push("──────────────────────");
  lines.push(`💰 *TOTAL: ${formatPrice(totalPrice)}*`);
  lines.push("");

  if (deliveryMethod === "delivery") {
    lines.push(`🛵 *Modalidad:* DELIVERY`);
    if (address) {
      lines.push(`📍 *Dirección:* ${address}`);
    }
  } else if (deliveryMethod === "pickup") {
    lines.push(`🏠 *Modalidad:* RETIRO EN LOCAL`);
  }

  const paymentLabels: Record<string, string> = {
    cash: "💵 *Medio de pago:* EFECTIVO",
    transfer: "🏦 *Medio de pago:* TRANSFERENCIA",
    other: "💳 *Medio de pago:* OTRO MEDIO",
  };
  if (paymentMethod && paymentLabels[paymentMethod]) {
    lines.push(paymentLabels[paymentMethod]);
  }


  if (notes) {
    lines.push("");
    lines.push(`📝 *Notas:* ${notes}`);
  }

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━");

  return lines.join("\n");
}


export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}
