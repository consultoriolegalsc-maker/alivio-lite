import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alivio Lite — Apoyo emocional con IA",
  description:
    "Alivio Lite es un compañero cálido de apoyo emocional en español. Gratis, anónimo y disponible 24/7.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#A8D8EA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('alivio-theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var shouldDark = stored ? stored === 'dark' : prefersDark;
                if (shouldDark) document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
