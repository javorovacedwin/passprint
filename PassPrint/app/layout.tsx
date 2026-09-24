import type { Metadata } from "next";
import { newsreader, plexMono, plexSans } from "@/lib/fonts";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { isShopifyConfigured } from "@/lib/shopify";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "bakirpaints — PassPrint",
    template: "%s — PassPrint",
  },
  description:
    "A monthly art publication in an envelope. An A5 print, an A6 companion and one story a month, drawn by an artist from the place. Collection 01: Yugo, opening in Mostar, October 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <LocaleProvider>
          <CartProvider enabled={isShopifyConfigured()}>
            <MotionProvider>
              <Header />
              <main id="content">{children}</main>
              <Footer />
              <CartDrawer />
            </MotionProvider>
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
