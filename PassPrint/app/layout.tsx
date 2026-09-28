import type { Metadata } from "next";
import { cormorant, jost } from "@/lib/fonts";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { isShopifyConfigured } from "@/lib/shopify";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pressio Atelier — Bakir C.",
    template: "%s — Pressio Atelier",
  },
  description:
    "Paintings by Bakir C. from a studio in Novi Pazar, and prints of them in A3, A4, A5 and A6, numbered by hand.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <LocaleProvider>
          <CartProvider enabled={isShopifyConfigured()}>
            <MotionProvider>
              <AnnouncementBar />
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
