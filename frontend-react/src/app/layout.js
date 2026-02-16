import "./globals.css";
import LayoutClient from "./layout-client";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
