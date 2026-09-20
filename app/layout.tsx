import type { ReactNode } from "react";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/great-vibes/latin-400.css";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-500.css";
import "./styles.css";
export const metadata = {
  metadataBase: new URL("https://maria-paula-gamma.vercel.app"),
  title: "María Paula · Mis quince años",
  description:
    "Una noche bajo la luna. Celebra los quince años de María Paula el 17 de octubre de 2026 en Castilla Gourmet, Bogotá.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://maria-paula-gamma.vercel.app/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://maria-paula-gamma.vercel.app/",
    title: "María Paula · Mis quince años",
    description: "Te espero el 17 de octubre de 2026 a las 8:00 p.m. en Castilla Gourmet, Bogotá. Confirma tu asistencia hasta el 10 de octubre.",
    images: [{ url: "https://maria-paula-gamma.vercel.app/images/maria-paula-opengraph.png", alt: "María Paula · Mis quince años, entre rosas azules y la luna", width: 1893, height: 898 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "María Paula · Mis quince años",
    description: "17 de octubre de 2026 · 8:00 p.m. · Castilla Gourmet, Bogotá.",
    images: ["https://maria-paula-gamma.vercel.app/images/maria-paula-opengraph.png"],
  },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
