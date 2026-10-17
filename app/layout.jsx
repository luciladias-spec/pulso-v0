import "./globals.css";

export const metadata = {
  title: "Vender Pulso",
  description: "Material interno.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Karla:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
