import type { ReactNode } from "react";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/great-vibes/latin-400.css";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-500.css";
import "./styles.css";
export const metadata = {
  title: "María Paula · Mis quince años",
  description:
    "Una noche bajo la luna. Celebra los quince años de María Paula el 17 de octubre de 2026 en Castilla Gourmet, Bogotá.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
