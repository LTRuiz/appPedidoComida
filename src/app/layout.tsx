import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickBite — Comida Rápida",
  description: "Pedí tu comida favorita por WhatsApp. Delivery o retiro en local.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
